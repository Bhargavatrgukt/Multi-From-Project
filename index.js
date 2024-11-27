let nextStepBtn = document.getElementById('next-step-btn');
let goBackBtn = document.getElementById("go-back-btn");

let stepOne=document.getElementById('step-1');
let stepTwo=document.getElementById('step-2');
let stepThree=document.getElementById('step-3');
let stepFour=document.getElementById('step-4');
let thankYouCard=document.getElementById("thank-you-card");
let footer=document.getElementById("footer");
let ulElement=document.getElementById("summary")

const billingToggle = document.querySelector('#billing-toggle'); // Billing type toggle


const steps = [
   stepOne,stepTwo,stepThree,stepFour
];

const stepsIndicator = [
    document.getElementById("step-1-indicator"),
    document.getElementById("step-2-indicator"),
    document.getElementById("step-3-indicator"),
    document.getElementById("step-4-indicator")
];

function applyClasses(element, className) {
    const classMap = {
        flexRowBetween: ["flex", "flex-row", "justify-between"]
    };

    if (classMap[className]) {
        element.classList.add(...classMap[className]);
    } else {
        console.error(`Class name "${className}" not found in classMap.`);
    }
}




let selectedPlan = {
    plan: 'Arcade',
    billing: 'monthly',
    price: 9,
};

let selectedAddon={}


let summaryContainer = document.getElementById("summary");
let planName=document.getElementById("plan-name");
let planPrice=document.getElementById("plan-price");
let total=document.getElementById("total");
let totalCal=document.getElementById("total-cal")

function summation() {

    planName.textContent = `${selectedPlan.plan} (${selectedPlan.billing})`;
    planPrice.textContent = `$${selectedPlan.price}/${selectedPlan.billing === 'yearly' ? 'yr' : 'mo'}`;

    // Clear previous add-ons
    const existingAddOns = summaryContainer.querySelectorAll(".addon-item");
    existingAddOns.forEach(addOn => addOn.remove());

    // Add new add-ons
    for (let addOnName in selectedAddon) {
        const addOnDiv = document.createElement("div");
        addOnDiv.classList.add("flex", "justify-between", "addon-item");

        const addOnNameElement = document.createElement("p");
        addOnNameElement.textContent = addOnName;
        addOnNameElement.classList.add("text-cool-gray", "text-sm","pt-2","pb-2");

        const addOnPriceElement = document.createElement("p");
        const addOnPrice = selectedAddon[addOnName];
        addOnPriceElement.textContent = `+$${addOnPrice}/${selectedPlan.billing === 'yearly' ? 'yr' : 'mo'}`;
        addOnPriceElement.classList.add("text-marine-blue", "text-sm");

        addOnDiv.append(addOnNameElement, addOnPriceElement);
        summaryContainer.appendChild(addOnDiv);
    }

   total.textContent=`Total(per ${selectedPlan.billing})`
   const sum = Object.values(selectedAddon).reduce((accumulator, value) => accumulator + parseInt(value), 0);
   totalCal.textContent=`$${sum+parseInt(selectedPlan.price)}/${selectedPlan.billing === 'yearly' ? 'yr' : 'mo'}`
   
   document.getElementById("change-plan").addEventListener("click", function (event) {
    event.preventDefault(); 
    stepFour.classList.add("hidden");
    stepTwo.classList.remove("hidden");
});


}







function addOnsSelector(addOnsContainer){
    let addOnCards=addOnsContainer.querySelectorAll('.mt-1 .flex')
    addOnCards.forEach(card=>{
        let planOfAddOns=card.querySelector(".align-middle");
        let addOnName = card.querySelector("h3").textContent.trim();
        const isYearly = billingToggle.checked;
        const target=card.querySelector("input"); 
        if (planOfAddOns) {
            const monthlyPrice = planOfAddOns.getAttribute('data-price-monthly');
            const yearlyPrice = planOfAddOns.getAttribute('data-price-yearly');
    
            // Update price text based on toggle state
            planOfAddOns.textContent = isYearly ? `$${yearlyPrice}/yr` : `$${monthlyPrice}/mo`;
             
    
        }    
        if(target.checked){
            const monthlyPrice = planOfAddOns.getAttribute('data-price-monthly');
            const yearlyPrice = planOfAddOns.getAttribute('data-price-yearly');
            selectedAddon[addOnName]= isYearly?yearlyPrice:monthlyPrice;
        }   
    
    })

    console.log(selectedAddon)
    
   
   addOnsContainer.addEventListener("change",event=>{
    const target=event.target;
    const card=target.closest(".flex")
    let addOnName = card.querySelector("h3").textContent.trim(); // Add-on name
    const monthlyPrice = parseInt(card.querySelector(".align-middle").getAttribute('data-price-monthly'));
    const yearlyPrice = parseInt(card.querySelector(".align-middle").getAttribute('data-price-yearly'));
    const isYearly = billingToggle.checked;
    if (target.checked) {
        selectedAddon[addOnName] = isYearly ? yearlyPrice : monthlyPrice;  // Add to selectedAddOns
    } else {
        delete selectedAddon[addOnName]; // Remove from selectedAddOns
    }
    summation()
   })

}


function planSelector(planCard) {
    // Select all necessary elements
    const planCards = planCard.querySelectorAll('.m-1 .flex'); // All plan cards
  

    // Set the default plan when the page loads
    function setDefaultPlan() {
        const defaultPlan = planCard.querySelector('#arcade'); // Default to Arcade plan
        if (defaultPlan) {
            defaultPlan.classList.add('border-marine-blue', 'bg-magnolia', 'selected-plan');
            selectedPlan.plan = defaultPlan.getAttribute('data-plan');
            selectedPlan.price = defaultPlan.getAttribute('data-price-monthly');
        }
    }

    // Handle plan selection
    function selectPlan(planElement) {
        // Remove selection styles from all plan cards
        planCards.forEach(card => {
            card.classList.remove('border-marine-blue', 'bg-magnolia', 'selected-plan');
        });

        // Add selection styles to the clicked card
        planElement.classList.add('border-marine-blue', 'bg-magnolia', 'selected-plan');

        // Update the selected plan object
        selectedPlan.plan = planElement.getAttribute('data-plan');
        selectedPlan.price = billingToggle.checked
            ? planElement.getAttribute('data-price-yearly')
            : planElement.getAttribute('data-price-monthly');
        
        selectedPlan.billing=billingToggle.checked?"yearly":"monthly" 
        summation() 


        // console.log("Selected Plan:", selectedPlan); // Debugging log
    }

    // Update prices for all plans when billing type is toggled
    function updatePrices() {
        planCards.forEach(card => {
            const priceElement = card.querySelector('.price');
            const offerElement = card.querySelector('.offer'); // Optional "2 months free" message

            if (priceElement) {
                const monthlyPrice = card.getAttribute('data-price-monthly');
                const yearlyPrice = card.getAttribute('data-price-yearly');

                // Update price text based on toggle state
                priceElement.textContent = billingToggle.checked
                    ? `$${yearlyPrice}/yr`
                    : `$${monthlyPrice}/mo`;

                // Show or hide the offer message
                if (offerElement) {
                    offerElement.classList.toggle('hidden', !billingToggle.checked); //adds class conditionally
                }
            }
            // console.log(selectedPlan)
        });

    
        const selectedCard = planCard.querySelector('.selected-plan');
        if (selectedCard) {
            selectedPlan.price = billingToggle.checked
                ? selectedCard.getAttribute('data-price-yearly')
                : selectedCard.getAttribute('data-price-monthly');
            
                selectedPlan.billing=billingToggle.checked?"yearly":"monthly"     
        }

        // console.log("Updated Prices for Billing Type:", billingToggle.checked ? "Yearly" : "Monthly");
        summation()
    }

    // Attach click event listeners to each plan card
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            selectPlan(card);
        });
    });

    // Attach change event listener to the billing toggle
    billingToggle.addEventListener('change', () => {
        updatePrices();
        addOnsSelector(stepThree);
    });

    // Initialize the default plan on page load
    setDefaultPlan();
}


function verifyRequiredFields(currentStep, currentStepIndex) {
    if (currentStepIndex === 0) {
        let isVerify = true;
        const inputs = currentStep.querySelectorAll('input');
        inputs.forEach(input => {
            const errorMsg = document.getElementById(`${input.id}-error-msg`);
            if (input.value.trim() === '') {
                errorMsg.classList.remove('hidden');
                input.classList.add('border-red-300');
                isVerify = false;
            } else {
                errorMsg.classList.add('hidden');
                input.classList.remove('border-red-300');
            }
        });
        return isVerify;
    }

    return true;
}

nextStepBtn.addEventListener('click', () => {
    let currentStepIndex = steps.findIndex(step => !step.classList.contains("hidden"));
    let currentStep = steps[currentStepIndex];
    if (currentStepIndex<(steps.length)-1){
        if (verifyRequiredFields(currentStep, currentStepIndex)) {
            currentStep.classList.add('hidden');
            stepsIndicator[currentStepIndex].classList.remove('bg-light-blue');
            stepsIndicator[currentStepIndex].classList.add('text-white', 'border', 'border-white');

            if (currentStepIndex + 1 < steps.length) {
                steps[currentStepIndex + 1].classList.remove('hidden');
                stepsIndicator[currentStepIndex + 1].classList.remove('text-white', 'border', 'border-white', "bg-transparent");
                stepsIndicator[currentStepIndex + 1].classList.add('bg-light-blue');
                goBackBtn.classList.remove('hidden');
                goBackBtn.classList.add('ml-auto');
            }

            if(currentStepIndex+1===3){
               nextStepBtn.classList.remove("bg-marine-blue");
               nextStepBtn.classList.add('bg-purplish-blue');
               nextStepBtn.textContent="Confirm";
            }else{
               nextStepBtn.classList.add("bg-marine-blue");
               nextStepBtn.classList.remove('bg-purplish-blue');
               nextStepBtn.textContent="Next Step";
            }
        
        }
  }else{
  steps[currentStepIndex].classList.add('hidden');
  footer.classList.add("hidden");
  thankYouCard.classList.remove('hidden');
  }

});


goBackBtn.addEventListener('click',()=>{
    let currentStepIndex = steps.findIndex(step => !step.classList.contains("hidden"));
    let currentStep = steps[currentStepIndex];
    
    stepsIndicator[currentStepIndex].classList.add('bg-light-blue');
    stepsIndicator[currentStepIndex].classList.remove('text-white', 'border', 'border-white');
     
    if(currentStepIndex>0){
        currentStep.classList.add('hidden');
        steps[currentStepIndex-1].classList.remove("hidden");
    }
});

planSelector(stepTwo);

addOnsSelector(stepThree);

summation();
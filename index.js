let nextStepBtn = document.getElementById('next-step-btn');
let goBackBtn = document.getElementById("go-back-btn");

const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3')
];

const stepsIndicator = [
    document.getElementById("step-1-indicator"),
    document.getElementById("step-2-indicator"),
    document.getElementById("step-3-indicator"),
    document.getElementById("step-4-indicator")
];

let selectedPlan = {
    plan: 'Arcade',
    billing: 'monthly',
    price: 9,
};

// function planSelector(planCard) {
//     const planCards = planCard.querySelectorAll('.m-1 .flex');
//     const billingToggle = planCard.querySelector('#billing-toggle');

//     function setDefaultPlan() {
//         const defaultPlan = planCard.querySelector('#arcade');
//         defaultPlan.classList.add('border-marine-blue', 'bg-light-blue', 'selected-plan');
//         selectedPlan.plan = defaultPlan.getAttribute('data-plan');
//         selectedPlan.price = defaultPlan.getAttribute('data-price-monthly');
//     }

//     function selectPlan(planElement) {
//         planCards.forEach(card => {
//             card.classList.remove('border-marine-blue', 'bg-light-blue', 'selected-plan');
//         });

//         planElement.classList.add('border-marine-blue', 'bg-light-blue', 'selected-plan');

//         selectedPlan.plan = planElement.getAttribute('data-plan');
//         console.log(planElement.getAttribute('data-plan'))
//         console.log(selectedPlan.plan)
//         selectedPlan.price = billingToggle.checked
//             ? planElement.getAttribute('data-price-yearly')
//             : planElement.getAttribute('data-price-monthly');
//     }

//     planCards.forEach(card => {
//         card.addEventListener('click', () => {
//             selectPlan(card);
//             console.log(selectedPlan)
//         });
//     });

//     billingToggle.addEventListener('change', () => {
       
//     });

//     setDefaultPlan();
// }

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
    }
});


goBackBtn.addEventListener('click',()=>{

});

// planSelector(document.getElementById('step-2'));



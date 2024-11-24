let nextStepBtn=document.getElementById('next-step-btn');
let goBackBtn=document.getElementById("go-back-btn");

const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3')
]   



const stepsIndicator=[
    document.getElementById("step-1-indicator"),
    document.getElementById("step-2-indicator"),
    document.getElementById("step-3-indicator"),
    document.getElementById("step-4-indicator")
]

function verifyRequiredFields(currentStep,currentStepIndex) {
    console.log(currentStepIndex)
    if(currentStepIndex!=0){
        return true
    }else{
        let isVerify=true
        const inputs = currentStep.querySelectorAll('input');
        inputs.forEach(input => {
        const errorMsg = document.getElementById(`${input.id}-error-msg`);
        if (input.value.trim() === '') {
            errorMsg.classList.remove('hidden');
            input.classList.add('border-red-300');
            isVerify=false;
        } else {
            errorMsg.classList.add('hidden');
            input.classList.remove('border-red-300');
        }
        });
      return isVerify  
    }
  }



nextStepBtn.addEventListener('click',()=>{
    let currentStepIndex=steps.findIndex(step=>!step.classList.contains("hidden"));
    let currentStep=steps[currentStepIndex];
    if(verifyRequiredFields(currentStep,currentStepIndex)){
        currentStep.classList.add('hidden');
        stepsIndicator[currentStepIndex].classList.remove('bg-light-blue');
        stepsIndicator[currentStepIndex].classList.add('text-white', 'border', 'border-white');
        if (currentStepIndex + 1 < steps.length) {
          steps[currentStepIndex + 1].classList.remove('hidden');
          stepsIndicator[currentStepIndex+1].classList.remove('text-white', 'border', 'border-white',"bg-transparent");
          stepsIndicator[currentStepIndex+1].classList.add('bg-light-blue')
          goBackBtn.classList.remove('hidden');
          goBackBtn.classList.add('ml-auto');
        }
    }
});


  
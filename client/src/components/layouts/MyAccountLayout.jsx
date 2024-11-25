import React, { useEffect, useState } from 'react';
import { MyAccountSectionTitle } from '../../components/MyAccountSectionTitle';
import { MyAccountSection} from '../sections/MyAccountSection';
import { sectionsConfig } from '../sections/MyAccountSectionsConfig';


const MyAccountLayout = () => {
  const [step, setStep] = useState(0);
  const [clearForm, setClearForm] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    sectionsConfig[step].labels.forEach((label) => {
      initialValues[label.title] = '';
    });
    setFormValues(initialValues);
    if (clearForm) {
      setClearForm(false);
    }
  }, [step, clearForm]);

  const handleChangeStep = (selectedStep) => {
    setStep(selectedStep);
    setClearForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col p-6 w-[90vw] h-auto lg:w-auto border border-[#e9e9ef] rounded-md shadow-sm gap-6 bg-white">
      <h2 className="text-3xl font-semibold text-center">Mi cuenta</h2>
      <div className="flex flex-col justify-center w-full gap-4 lg:flex-row">
        {sectionsConfig.map((s) => (
          <MyAccountSectionTitle
            key={s.step}
            section={s}
            actualStep={step}
            icon={s.icon}
            changeStep={handleChangeStep}
          />
        ))}
      </div>
      <MyAccountSection
        section={sectionsConfig[step]}
        clearForm={clearForm}
        formValues={formValues}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default MyAccountLayout;

import React, { useState, useEffect } from 'react'
import { MyAccountSection } from '../sections/MyAccountSection';
import { MyAccountSectionTitle } from '../MyAccountSectionTitle';
import { InfoAccount } from '../icons/InfoAccount.jsx'
import { Padlock } from '../icons/Padlock.jsx';
import { Danger } from '../icons/Danger.jsx';
import { FormTitle } from '../forms/FormTitle.jsx';
import { SubTitle } from '../forms/SubTitle.jsx';

const iconComponents = {
  infoAccount: <InfoAccount />,
  padlock: <Padlock />,
  danger: <Danger />
};

const MyAccountLayout = () => {

  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  const [step, setStep] = useState(1);
  const [clearForm, setClearForm] = useState(false);

  const handleChangeStep = (selectedStep) => {
    setStep(selectedStep)
    setClearForm(true);
  }

  useEffect(() => {
    if (clearForm) {
      setClearForm(false);
    }
  }, [clearForm]);

  const fetchSections = async () => {
    const data = await fetch("http://localhost:8000/sections").then(data => data.json())
    return data;
  }


  useEffect(() => {
    const loadSections = async () => {
      const SectionsData = await fetchSections()
      setSections(SectionsData)
      setLoading(false)
    };
    loadSections();
  }, [])

  return (
    <div className="flex flex-col p-6 w-[90vw] h-[80vh] lg:w-[30vw] gap-6 bg-white rounded-xl overflow-hidden">
      <div className="flex flex-col gap-1">
        <FormTitle title='Mi cuenta'></FormTitle>
        <SubTitle subtitle='¡Seleccioná una opción para mas detalles!'></SubTitle>
      </div>
      <div className='flex flex-row justify-left w-full gap-4'>
        {sections.map(s => (
          <MyAccountSectionTitle section={s} icon={iconComponents[s.icon]} actualStep={step} changeStep={handleChangeStep} />
        ))}
      </div>
      {console.log(sections[step])}
      {!loading && sections.length > 0 && (
        <MyAccountSection
          section={sections[step]}
          clearForm={clearForm}
        />
      )}
    </div>
  )
}

export default MyAccountLayout;
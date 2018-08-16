/*****
 * visit doctor
 * @param {org.doctors.network.VisitDoctor} visitDoctor -- visit and get med
 * @transaction
 */

async function visitDoctor(visitDoc) {

    //console.log(visitDoc);
  const doc = visitDoc.doctor;
  const pat = visitDoc.patient;
  const med = visitDoc.medicine;
 
  doc.accountBalance += med.Price;
  pat.accountBalance -= med.Price;

  //update doctors account balance
  const docRegistry = await getParticipantRegistry('org.doctors.network.Doctor');
  await docRegistry.update(doc);

  //update patient account balance
  const patRegistry = await getParticipantRegistry('org.doctors.network.Patient');
  await patRegistry.update(pat);

}

/**
* Initialize some test assets and participants useful for running a demo..
* @param {org.doctors.network.SetupDemo} setupDemo - the SetupDemo transaction
* @transaction
*/
async function setupDemo(setupDemo) {  // eslint-disable-line no-unused-vars

   const factory = getFactory();
   const NS = 'org.doctors.network';

   // create the doctor
   const doctor = factory.newResource(NS, 'Doctor', 'd1');
   doctor.Name = 'doooo';
   doctor.accountBalance = 1000;

   // create the patient
   const patient = factory.newResource(NS, 'Patient', 'p1');
   patient.Name = 'pat';
   patient.accountBalance = 100;

   // create the medicine
   const medicine = factory.newResource(NS, 'Medicine', 'm1');
     medicine.Name = 'amox';
   medicine.Price = 20;

   // add the doctors
   const doctorRegistry = await getParticipantRegistry(NS + '.Doctor');
   await doctorRegistry.addAll([doctor]);

   // add the patients
   const patientRegistry = await getParticipantRegistry(NS + '.Patient');
   await patientRegistry.addAll([patient]);

   // add the medicines
   const medicineRegistry = await getAssetRegistry(NS + '.Medicine');
   await medicineRegistry.addAll([medicine]);

}
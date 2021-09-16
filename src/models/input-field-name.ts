export enum InputFieldName {
  // Name
  NAME__FIRST = "name,first",
  NAME__LAST = "name,last",
  // Address
  ADDRESS_CITY = "address,city",
  ADDRESS_POSTAL_CODE = "address,postal-code",
  ADDRESS_STATE = "address,state",
  ADDRESS_STREET = "address,street",
  // Contact
  CONTACT_EMAIL = "contact,email",
  CONTACT_PHONE_CELL = "contact,phone,cell",
  CONTACT_PHONE_HOME = "contact,phone,home",
  CONTACT_EMERGENCY_NAME = "contact,emergency,name",
  CONTACT_EMERGENCY_PHONE = "contact,emergency,phone",
  // Medical
  MEDICAL_CONDITIONS = "medical,conditions",
  MEDICAL_MEDICATIONS = "medical,medications",
  MEDICAL_SMOKE = "medical,smoke",
  MEDICAL_ALCOHOL = "medical,alcohol",
  // Residency
  RESIDENCY_NC_RESIDENT = "residency,nc,resident",
  RESIDENCY_NC_OUTSIDE = "residency,nc,outside",
  RESIDENCY_NC_OUTSIDE_YES = "residency,nc,outside,yes",
  // Crime
  CRIME_CONVICTED = "crime,convicted",
  CRIME_CONVICTED_YES = "crime,convicted,yes",
  // Transportation
  TRANSPORTATION_DRIVERS_LICENSE_VALID = "transportation,drivers-license,valid",
  TRANSPORTATION_DRIVERS_LICENSE_VALID_NO = "transportation,drivers-license,valid,no",
  TRANSPORTATION_DRIVERS_LICENSE_NUMBER = "transportation,drivers-license,number",
  TRANSPORTATION_DRIVERS_LICENSE_STATE = "transportation,drivers-license,state",
  TRANSPORTATION_OWN_VEHICLE = "transportation,own-vehicle",
  TRANSPORTATION_OWN_VEHICLE_NO = "transportation,own-vehicle,no",
  // Availability
  AVAILABILITY_SCHEDULE_DAYS = "availability,schedule,days",
  AVAILABILITY_SCHEDULE_EVENINGS = "availability,schedule,evenings",
  AVAILABILITY_SCHEDULE_NIGHTS = "availability,schedule,nights",
  AVAILABILITY_SCHEDULE_WEEKENDS = "availability,schedule,weekends",
  AVAILABILITY_SCHEDULE_FULL_TIME = "availability,schedule,full-time",
  AVAILABILITY_SCHEDULE_PART_TIME = "availability,schedule,part-time",
  AVAILABILITY_EMPLOYED_ELSEWHERE = "availability,employed-elsewhere",
  AVAILABILITY_EMPLOYED_ELSEWHERE_YES = "availability,employed-elsewhere,yes",
  AVAILABILITY_PREVENT_ON_TIME = "availability,prevent-on-time",
  // Education
  EDUCATION_LAST_GRADE_COMPLETED = "education,last-grade-completed",
  EDUCATION_HIGH_SCHOOL_DIPLOMA = "education,high-school,diploma",
  EDUCATION_HIGH_SCHOOL_LOCATION = "education,high-school,location",
  EDUCATION_GED = "education,ged",
  EDUCATION_GED_LOCATION = "education,ged,location",
  EDUCATION_COLLEGE_LOCATION = "education,college,location",
  EDUCATION_COLLEGE_DEGREE = "education,college,degree",
  EDUCATION_COLLEGE_GRADUATION_DATE = "education,college,graduation-date",
  // Certifications
  CERTIFICATION_SELECT = "certification,select",
  CERTIFICATION_OTHER = "certification,other",
  CERTIFICATION_CURRENT_NOT_EXPIRED = "certification,current-not-expired",
  CERTIFICATION_RELEVANT_QUALIFICATIONS = "certification,relevant-qualifications"
}

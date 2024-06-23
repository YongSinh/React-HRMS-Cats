
import { Space, Table, Tag,Button,Form,Input } from 'antd';
import React, { useState } from 'react';
import {  Modal } from 'antd';
import PageTitle from '../../components/Title_Page/TitlePage';
import { EyeFilled, DeleteOutlined,EditFilled,PlusOutlined,PlusCircleOutlined} from "@ant-design/icons";

const columns = [
  {
    title: "No",
    dataIndex: "No",
    render: (_, { No }) => {
      return (
        <>
          <div>
            <text style={{ fontSize: 13}} >
              {No}
            </text>
          </div>
        </>
      );
    },
  },
  {
    title: 'depId',
    dataIndex: 'depId',
    key: 'depId',

  },
  {
    title: 'depName',
    dataIndex: 'depName',
    key: 'depName',
  },
  
  {
    title: 'positions',
    key: 'positions',
    dataIndex: 'positions',
    render: (_, { positions }) => (
      <>
        {positions.map((positions) => {
          let color = 'green';
          return (
            <Tag color={color}>
              {positions.posName.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, ) => (
      <Space>
      
        <Button type="primary" icon={<PlusCircleOutlined />} />
        <Button type="primary" icon={<EditFilled />} />
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
];
const data = [
    
        
          {
            "depId": 202,
            "depName": "MIS",
            "positions": [
              {
                "posId": "MIS01",
                "posName": "Director",
                "poSection": "",
                "poLevel": "4",
                "employees": [
                  {
                    "empId": 1000,
                    "firstName": "Steven",
                    "lastName": "King",
                    "email": "steven@mail.com",
                    "birthDate": "1987-06-17",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 4,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10008626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "MIS02",
                "posName": "ATS & Application Support Manager",
                "poSection": "ASS",
                "poLevel": "6",
                "employees": [
                  {
                    "empId": 1001,
                    "firstName": "Neena",
                    "lastName": "Kochhar",
                    "email": "neena@mail.com",
                    "birthDate": "1987-06-17",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 6,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10018626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 60
                  }
                ]
              },
              {
                "posId": "MIS03",
                "posName": "System Programming Officer",
                "poSection": "ASS",
                "poLevel": "9",
                "employees": [
                  {
                    "empId": 1002,
                    "firstName": "Lex",
                    "lastName": "De Haan",
                    "email": "lex@mail.com",
                    "birthDate": "1987-06-17",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10028626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 80
                  },
                  {
                    "empId": 1013,
                    "firstName": "Luis",
                    "lastName": "Urman",
                    "email": "luis@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10138626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  },
                  {
                    "empId": 1014,
                    "firstName": "Den",
                    "lastName": "Raphaely",
                    "email": "den@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 4,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10148626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  },
                  {
                    "empId": 1015,
                    "firstName": "Alexander",
                    "lastName": "Khoo",
                    "email": "alexander@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10158626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "MIS04",
                "posName": "ATS & Application Support Supervisor",
                "poSection": "ASS",
                "poLevel": "11",
                "employees": []
              },
              {
                "posId": "MIS02",
                "posName": "ATS & Application Support Manager",
                "poSection": "ASS",
                "poLevel": "6",
                "employees": [
                  {
                    "empId": 1001,
                    "firstName": "Neena",
                    "lastName": "Kochhar",
                    "email": "neena@mail.com",
                    "birthDate": "1987-06-17",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 6,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10018626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 60
                  }
                ]
              },
              {
                "posId": "MIS03",
                "posName": "System Programming Officer",
                "poSection": "ASS",
                "poLevel": "9",
                "employees": [
                  {
                    "empId": 1002,
                    "firstName": "Lex",
                    "lastName": "De Haan",
                    "email": "lex@mail.com",
                    "birthDate": "1987-06-17",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10028626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 80
                  },
                  {
                    "empId": 1013,
                    "firstName": "Luis",
                    "lastName": "Urman",
                    "email": "luis@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10138626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  },
                  {
                    "empId": 1014,
                    "firstName": "Den",
                    "lastName": "Raphaely",
                    "email": "den@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 4,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10148626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  },
                  {
                    "empId": 1015,
                    "firstName": "Alexander",
                    "lastName": "Khoo",
                    "email": "alexander@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10158626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "MIS04",
                "posName": "ATS & Application Support Supervisor",
                "poSection": "ASS",
                "poLevel": "11",
                "employees": []
              }
            ]
          },
          {
            "depId": 2,
            "depName": "FAD",
            "positions": [
              {
                "posId": "FAD01",
                "posName": "Director",
                "poSection": "",
                "poLevel": "4",
                "employees": [
                  {
                    "empId": 1003,
                    "firstName": "Alexander",
                    "lastName": "Hunold",
                    "email": "alexander@mail.com",
                    "birthDate": "1990-01-03",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 4,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10038626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "FAD02",
                "posName": "Finance Manager",
                "poSection": "",
                "poLevel": "6",
                "employees": [
                  {
                    "empId": 1004,
                    "firstName": "Bruce",
                    "lastName": "Ernst",
                    "email": "bruce@mail.com",
                    "birthDate": "1991-05-21",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 6,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10048626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 60
                  }
                ]
              },
              {
                "posId": "FAD03",
                "posName": "Accountant Manager",
                "poSection": "",
                "poLevel": "6",
                "employees": [
                  {
                    "empId": 1005,
                    "firstName": "David",
                    "lastName": "Austin",
                    "email": "david@mail.com",
                    "birthDate": "1997-06-25",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10058626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 80
                  },
                  {
                    "empId": 1006,
                    "firstName": "Valli",
                    "lastName": "Pataballa",
                    "email": "vallir@mail.com",
                    "birthDate": "1990-01-03",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10068626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "FAD04",
                "posName": "Accountant Officer",
                "poSection": "",
                "poLevel": "11",
                "employees": [
                  {
                    "empId": 1011,
                    "firstName": "Ismael",
                    "lastName": "Ismael",
                    "email": "ismael@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 11,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10118626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              }
            ]
          },
          {
            "depId": 3,
            "depName": "HRD",
            "positions": [
              {
                "posId": "HRD01",
                "posName": "Director",
                "poSection": "",
                "poLevel": "4",
                "employees": [
                  {
                    "empId": 1007,
                    "firstName": "Diana",
                    "lastName": "Lorentz",
                    "email": "dianar@mail.com",
                    "birthDate": "1990-01-03",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Siem Reap Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 4,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10078626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "HRD02",
                "posName": "Human Resource Manager",
                "poSection": "",
                "poLevel": "6",
                "employees": [
                  {
                    "empId": 1008,
                    "firstName": "Nancy",
                    "lastName": "Greenberg",
                    "email": "nancy@mail.com",
                    "birthDate": "1990-01-03",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 6,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10088626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "HRD03",
                "posName": "Human Resource Supervisor",
                "poSection": "",
                "poLevel": "9",
                "employees": [
                  {
                    "empId": 1009,
                    "firstName": "Daniel",
                    "lastName": "Faviet",
                    "email": "daniel@mail.com",
                    "birthDate": "1990-01-03",
                    "age": 40,
                    "sex": "Female",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 9,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10098626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "HRD04",
                "posName": "Human Resource Officer",
                "poSection": "",
                "poLevel": "11",
                "employees": [
                  {
                    "empId": 1010,
                    "firstName": "John",
                    "lastName": "Chen",
                    "email": "john@mail.com",
                    "birthDate": "1997-09-28",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 11,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10108626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  },
                  {
                    "empId": 1012,
                    "firstName": "Jose Manuel",
                    "lastName": "Urman",
                    "email": "manuel@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 11,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10128626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              }
            ]
          },
          {
            "depId": 4,
            "depName": "BSD",
            "positions": []
          },
          {
            "depId": 5,
            "depName": "AIM",
            "positions": []
          },
          {
            "depId": 6,
            "depName": "GAF",
            "positions": []
          },
          {
            "depId": 7,
            "depName": "ENG",
            "positions": [
              {
                "posId": "ENG01",
                "posName": "Director",
                "poSection": "",
                "poLevel": "4",
                "employees": [
                  {
                    "empId": 1016,
                    "firstName": "Shelli",
                    "lastName": "Baida",
                    "email": "ahelli@mail.com",
                    "birthDate": "1997-09-30",
                    "age": 40,
                    "sex": "Male",
                    "height": 1.7,
                    "address": "Phnom Penh Cambodia",
                    "empDate": "2024-06-17",
                    "joinDate": "2024-06-17",
                    "mangerId": 4,
                    "location": "VDPP",
                    "maritalStats": "N",
                    "nationality": "Khmer",
                    "workType": "M",
                    "religion": "buddhist",
                    "idCard": "10168626AB4",
                    "passport": "",
                    "remark": "",
                    "govOfficer": "",
                    "govTel": "",
                    "govAddress": "",
                    "govPosition": "",
                    "jobHistories": [],
                    "emergencyContacts": [],
                    "siblingData": [],
                    "specialAbilities": [],
                    "weight": 70
                  }
                ]
              },
              {
                "posId": "ENG02",
                "posName": "Engineer Manager",
                "poSection": "",
                "poLevel": "9",
                "employees": []
              },
              {
                "posId": "ENG03",
                "posName": "Engineer Supervisor",
                "poSection": "",
                "poLevel": "9",
                "employees": []
              },
              {
                "posId": "ENG04",
                "posName": "Engineer officer",
                "poSection": "",
                "poLevel": "11",
                "employees": []
              }
            ]
          },
          {
            "depId": 8,
            "depName": "OPR",
            "positions": []
          },
          {
            "depId": 9,
            "depName": "OSP",
            "positions": []
          }
        
      
];
const DepartmentPage = () =>{ 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

return(
  <>
   <PageTitle
         PageTitle='Department'
      
      />

  <Button 

        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 15, marginTop: 7, }}
        onClick={showModal}>
        
        Add Department
      </Button>
      <Modal title="Add Department" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form layout="vertical" hideRequiredMark>
      <Form.Item
                name="depId"
                label="Department ID"
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                name="depName"
                label="Department Name"
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
              <Input />
              </Form.Item>
              <Form.Item
                name="positions"
                label="Position"
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
              <Input />
              </Form.Item>
              </Form>
      </Modal>
      <Table columns={columns} dataSource={data} />;
  </>
)

}
export default DepartmentPage;
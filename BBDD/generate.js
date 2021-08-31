module.exports = () => {
  const faker = require('faker/locale/es');
  const _ = require('lodash');
  return {
    User: _.times(100, function (n) {
      return {
        id: n + 1,
        Name: faker.name.firstName(),
        Surname: faker.name.lastName(),
      };
    }),
    Address: _.times(100, function (n) {
      return {
        id: n + 1,
        Address:
          faker.address.streetName() +
          ', ' +
          faker.datatype.number({
            min: 1,
            max: 100,
          }),
      };
    }),
    Vehicle: _.times(100, function (n) {
      return {
        id: n + 1,
        Brand: faker.vehicle.manufacturer(),
        Model: faker.vehicle.model(),
        Version: faker.vehicle.type(),
        Plate: faker.vehicle.vin(),
        FleetId: faker.datatype.number({
          min: 1,
          max: 20,
        }),
      };
    }),
    RealTime: _.times(100, function (n) {
      return {
        id: n + 1,
        Latitude: parseFloat(
          (Math.random() * (40.570295 - 40.25631144) + 40.25631144).toFixed(8),
        ),
        Longitude: parseFloat(
          (Math.random() * (-3.49481509 - -3.85509005) + -3.85509005).toFixed(
            8,
          ),
        ),
        Status: Math.floor(Math.random() * 4 + 1),
        Heading: Math.floor(Math.random() * 360 + 1),
        Locked: faker.datatype.boolean(),
      };
    }),
    RealTimeDetails: _.times(100, function (n) {
      return {
        id: n + 1,
        PositionDate: faker.date.between('2021-01-01', Date.now()),
        TotalKm: Math.floor(Math.random() * 1000000 + 1),
        DailyKm: Math.floor(Math.random() * 1000 + 1),
        StopDate: faker.date.between('2021-01-01', Date.now()),
        InactivePeriod: `${Math.floor(
          Math.random() * 24 + 1,
        )} horas ${Math.floor(Math.random() * 60 + 1)} mins`,
      };
    }),
    CustomTag: _.times(100, function (n) {
      return {
        id: n + 1,
        UserId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
        StartDate: faker.date.between('2019-01-01', Date.now()),
        EndDate: null,
      };
    }),
    CustomTagVehicle: _.times(100, function (n) {
      return {
        id: n + 1,
        CustomTagId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
        VehicleId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
      };
    }),
    Company: _.times(100, function (n) {
      return {
        id: n + 1,
        Name: faker.company.companyName(),
      };
    }),
    Permission: _.times(100, function (n) {
      return {
        id: n + 1,
        UserId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
        RoleId: 1,
        CompanyId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
        FleetId: 1,
        AggregationId: faker.datatype.number({
          min: 1,
          max: 50,
        }),
        VehicleId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
        StartDate: '2021-01-01',
        EndDate: null,
        UpdateDate: null,
        IdUserModif: null,
      };
    }),
    Fleet: _.times(20, function (n) {
      return {
        id: n + 1,
        Name: faker.lorem.word() + '-FLEET',
        StartDate: '2021-05-26',
        EndDate: null,
        CompanyId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
      };
    }),
    Aggregation: _.times(50, function (n) {
      return {
        id: n + 1,
        Name: faker.lorem.word(),
        StartDate: faker.date.between('2019-01-01', Date.now()),
        EndDate: null,
        FleetId: faker.datatype.number({
          min: 1,
          max: 20,
        }),
      };
    }),
    Journeys: [
      {
        id: 1,
        JourneyStart: '2021-07-21T13:24:01.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-21T13:38:20.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 8000,
        JourneyPathStr:
          '-3.3762 40.4716,-3.39259 40.4741,-3.39446 40.4768,-3.39838 40.483,-3.38835 40.4925,-3.37835 40.4979,-3.378 40.4981,-3.37832 40.5053,-3.37858 40.5123,-3.37088 40.511,-3.37185 40.5114,-3.37188 40.5114',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 2,
        JourneyStart: '2021-07-21T13:54:12.010',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-21T14:07:52.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 9000,
        JourneyPathStr:
          '-3.3756 40.512,-3.37891 40.5108,-3.37854 40.5001,-3.38809 40.4933,-3.40056 40.4846,-3.39805 40.4819,-3.39453 40.4765,-3.3878 40.4715,-3.37398 40.4703,-3.37595 40.4723,-3.37611 40.4715',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 3,
        JourneyStart: '2021-07-24T10:37:28.010',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-24T10:42:52.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 0,
        JourneyPathStr: '-3.37611 40.4715,-3.37859 40.4736,-3.37851 40.4735',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 4,
        JourneyStart: '2021-07-24T11:10:35.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-24T11:20:57.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 7000,
        JourneyPathStr:
          '-3.37669 40.4727,-3.37687 40.4703,-3.39249 40.4738,-3.3967 40.4802,-3.39616 40.4869,-3.3828 40.4959,-3.36824 40.5027,-3.36898 40.5015,-3.36924 40.5014',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 5,
        JourneyStart: '2021-07-24T13:07:01.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-24T13:20:21.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 6000,
        JourneyPathStr:
          '-3.37207 40.5003,-3.37582 40.497,-3.37779 40.4936,-3.37589 40.4901,-3.38135 40.4904,-3.37981 40.4863,-3.37396 40.4823,-3.37407 40.48,-3.37442 40.477,-3.37786 40.4744,-3.37604 40.4723,-3.3762 40.4716',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 6,
        JourneyStart: '2021-07-24T15:01:39.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-24T15:09:19.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 1000,
        JourneyPathStr:
          '-3.37584 40.4718,-3.37511 40.4716,-3.37351 40.4712,-3.36904 40.4729,-3.36695 40.4739,-3.36849 40.4733',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 7,
        JourneyStart: '2021-07-24T18:16:45.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-24T18:21:37.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 1000,
        JourneyPathStr:
          '-3.37188 40.4721,-3.37581 40.4723,-3.37617 40.4717,-3.37628 40.4716',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 8,
        JourneyStart: '2021-08-31T23:25:19.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-08-31T23:42:42.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 7000,
        JourneyPathStr:
          '-3.37587 40.4718,-3.37614 40.4723,-3.37614 40.4723,-3.37614 40.4723,-3.37486 40.4705,-3.38963 40.4724,-3.39439 40.4767,-3.39592 40.4796,-3.39386 40.4809,-3.39715 40.4819,-3.39493 40.4772,-3.39011 40.4724,-3.37498 40.4702,-3.3753 40.4718',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 9,
        JourneyStart: '2021-07-25T04:35:31.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-25T04:42:42.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 2000,
        JourneyPathStr:
          '-3.37619 40.4716,-3.38344 40.4757,-3.38459 40.4779,-3.38449 40.4776,-3.38415 40.4769',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 10,
        JourneyStart: '2021-07-25T04:44:44.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-07-25T04:55:47.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 3000,
        JourneyPathStr:
          '-3.38329 40.4753,-3.3807 40.4728,-3.37852 40.4736,-3.38134 40.4728,-3.38175 40.4732,-3.3775 40.4745,-3.37324 40.4735,-3.37335 40.4714,-3.37592 40.4724,-3.37619 40.4716',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
      {
        id: 11,
        JourneyStart: '2021-08-31T07:23:56.000',
        MotorState: 1,
        Isign: 1,
        JourneyEnd: '2021-08-31T07:49:36.000',
        JourneyEndIsIgn: 1,
        JourneyEndMetersSinceIgnON: 22000,
        JourneyPathStr:
          '-3.393 40.4742,-3.39865 40.475,-3.41278 40.4709,-3.42425 40.4681,-3.43954 40.4682,-3.44639 40.4673,-3.45134 40.4669,-3.45271 40.4668,-3.46473 40.4671,-3.47789 40.466,-3.4913 40.4627,-3.50665 40.4558,-3.52259 40.4496,-3.53649 40.4471,-3.5531 40.4491,-3.56799 40.4498,-3.58337 40.45,-3.59905 40.4503,-3.61434 40.4498,-3.62029 40.4508,-3.62027 40.4514,-3.62029 40.4514',
        Alerts: null,
        JourneyFuelUsed: 0.0,
      },
    ],
  };
};

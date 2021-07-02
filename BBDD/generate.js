module.exports = () => {
  const faker = require('faker/locale/es');
  const _ = require('lodash');
  return {
    User: _.times(100, function (n) {
      return {
        id: n + 1,
        Name: faker.name.firstName(),
        Surname: faker.name.lastName(),
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
        Manufacturer: faker.vehicle.manufacturer(),
        Model: faker.vehicle.model(),
        Type: faker.vehicle.type(),
        Registration: faker.vehicle.vin(),
        Latitude: (
          Math.random() * (40.570295 - 40.25631144) +
          40.25631144
        ).toFixed(8),
        Longitude: (
          Math.random() * (-3.49481509 - -3.85509005) +
          -3.85509005
        ).toFixed(8),
        Status: Math.floor(Math.random() * 4 + 1),
      };
    }),
    CustomTag: _.times(100, function (n) {
      return {
        id: n + 1,
        UserId: faker.datatype.number({
          min: 1,
          max: 100,
        }),
        StartDate: faker.date.between('2019-01-01', '2020-06-01'),
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
        Name: faker.lorem.word(),
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
        StartDate: faker.date.between('2019-01-01', '2020-06-01'),
        EndDate: null,
        FleetId: faker.datatype.number({
          min: 1,
          max: 20,
        }),
      };
    }),
  };
};

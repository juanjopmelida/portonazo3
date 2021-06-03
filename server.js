import {createServer, Model} from 'miragejs';

export function makeServer({environment = 'test'} = {}) {
  let server = createServer({
    environment,
    models: {
      vehicles: Model,
    },
    seeds(server) {
      server.create('vehicle', {
        idCustomer: 1,
        idVehicle: 1,
        idDevice: 1,
        plate: 'FLFK76',
      });
      server.create('vehicle', {
        idCustomer: 1,
        idVehicle: 2,
        idDevice: 2,
        plate: 'CVSX58',
      });
      server.create('vehicle', {
        idCustomer: 1,
        idVehicle: 3,
        idDevice: 3,
        plate: 'HWDT23',
      });
    },
    routes() {
      this.namespace = 'api/vehicles';
      this.get('/', (schema, request) => {
        return schema.vehicles.all();
      });
      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.vehicles.find(id);
      });
      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestplate);
        return schema.vehicles.create(attrs);
      });
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestplate);
        let id = request.params.id;
        let vehicle = schema.vehicles.find(id);
        return vehicle.update(newAttrs);
      });
      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.vehicles.find(id).destroy();
      });
    },
  });
  return server;
}

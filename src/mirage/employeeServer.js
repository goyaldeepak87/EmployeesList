import { createServer, Model, RestSerializer } from 'miragejs';

export function makeServer() {
  const server = createServer({
    models: {
      employee: Model,
    },
    serializers: {
      application: RestSerializer,
    },

    seeds(server) {
      server.create('employee', { id: 1, name: 'A', position: 'Software Engineer', email: 'A@gmail.com' });
      server.create('employee', { id: 2, name: 'B', position: 'Product Manager', email: 'B@gmail.com' });
      server.create('employee', { id: 3, name: 'C', position: 'Designer', email: 'C@gmail.com' });
      server.create('employee', { id: 4, name: 'D', position: 'QA Engineer', email: 'D@gmail.com' });
      server.create('employee', { id: 5, name: 'E', position: 'Backend Developer', email: 'E@gmail.com' });
      server.create('employee', { id: 6, name: 'F', position: 'Frontend Developer', email: 'F@gmail.com' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/employees', (schema) => {
        return schema.employees.all();
      });

      this.post('/employees', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.employees.create(attrs);
      });

      this.put('/employees/:id', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.employees.find(request.params.id);
        return employee.update(attrs);
      });

      this.delete('/employees/:id', (schema, request) => {
        const employee = schema.employees.find(request.params.id);
        return employee.destroy();
      });
    },
  });

  return server;
}

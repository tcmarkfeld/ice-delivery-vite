import http from '../http-common';

class DataService {
  getAll() {
    return http.get('/delivery/getordered');
  }

  create(data: any) {
    return http.post('/delivery/add', data);
  }

  update(id: number, data: any) {
    return http.put(`/delivery/edit/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/delivery/delete/${id}`);
  }

  verifyToken() {
    return http.get(`/auth/`);
  }
}

export default new DataService();

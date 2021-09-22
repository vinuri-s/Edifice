import http from "../http-common.js";

class WorkerDataService {
  getAll(id) {
    return http.get(`/workers/list/${id}`);
  }

  getAll() {
    return http.get(`/workers/list/`);
  }

  findVaildNIC(NIC) {
    return http.get(`/workers/validNIC?NIC=${NIC}`);
  }

  findVaildMobile(Mobile) {
    return http.get(`/workers/validMobile?Mobile=${Mobile}`);
  }

  create(data) {
    console.log(data)
    return http.post("/workers", data);

  }

  update(id, data) {
    return http.put(`/workers/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/workers/delete/${id}`);
  }
  /*
    deleteAll() {
      return http.delete(`/projects`);
    }
  
    findByTitle(title) {
      return http.get(`/projects?title=${title}`);
    }
    userProjects(id){
      return http.get(`/projects/user/list/${id}`);
    }*/
  // findPublished(){
  //   return http.get(`/projects?published=`)
  // }
}

export default new WorkerDataService();
import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/contact");
    }

    getAllCategories() {
        return http.get("/category");
    }

    createSc(data) {
        return http.post("/subcategory", data)
    }

    get(id) {
        return http.get(`/contact/${id}`);
    }

    create(data) {
        console.log(JSON.stringify(data));
        return http.post("/contact", data);
    }

    update(id, data) {
        console.log(JSON.stringify(data));
        return http.put(`/contact/${id}`, data);
    }

    delete(id) {
        return http.delete(`/contact/${id}`);
    }

    validateInput = (data) => {
        if (!data.firstName.trim()) {
        return false;
        }
        if (!data.lastName.trim()) {
            return false;
        }
        if (!data.email.trim()) {
            return false;
        }
        if (!data.phone.trim()) {
            return false;
        }
        if (!data.phone.match("[0-9]{9}"))
            return false;
    
        return true;
    };
}

export default new DataService();
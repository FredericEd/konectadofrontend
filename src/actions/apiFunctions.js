import {refreshToken} from './authActions';

export const getStores = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores', {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getStores(callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveStore = async (store_id, name, description, video_link, image_file, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('video_link', video_link);
        formData.append('image_file', image_file);

        const response = await fetch('http://34.73.113.72/api/v1/stores' + (store_id ? ("/" + store_id) : ""), {
            method: store_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveStore(store_id, name, description, image_file, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteStore = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteStore(store_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getLocales = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/locals", {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getLocales(store_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveLocal = async (local_id, name, address, email, phone, city_id, latitude, longitude, store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('city_id', city_id);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/locals" + (local_id ? ("/" + local_id) : ""), {
            method: local_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveLocal(local_id, name, address, email, phone, city_id, latitude, longitude, store_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteLocal = async (store_id, local_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/locals/" + local_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteLocal(store_id, local_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveDevice = async (local_id, store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {

        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/locals/" + local_id + "/devices", {
            method: 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => saveDevice(local_id, store_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteDevice = async (store_id, local_id, device_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/locals/" + local_id + "/devices/" + device_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteDevice(store_id, local_id, device_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getProducts = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/products", {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getProducts(store_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveProduct = async (product_id, store_id, name, description, price, image_file, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image_file', image_file);

        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/products" + (product_id ? ("/" + product_id) : ""), {
            method: product_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveProduct(product_id, store_id, name, description, price, image_file, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteProduct = async (store_id, product_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/products/" + product_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteProduct(store_id, product_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getCoupons = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/coupons", {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getCoupons(store_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveCoupon = async (coupon_id, store_id, product_id, start, end, counter_max, discount, start_time, end_time, is_promo, hours, billboards, locals, members, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('product_id', product_id);
        formData.append('start', start);
        formData.append('end', end);
        formData.append('counter_max', counter_max);
        formData.append('discount', discount);
        formData.append('start_time', start_time);
        formData.append('is_promo', is_promo);
        formData.append('hours', hours);
        formData.append('billboards', billboards);
        formData.append('locals', locals);
        formData.append('members', members);
        formData.append('end_time', end_time);

        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/coupons" + (coupon_id ? ("/" + coupon_id) : ""), {
            method: coupon_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveCoupon(coupon_id, store_id, product_id, start, end, counter_max, discount, start_time, end_time, billboards, locals, members, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteCoupon = async (store_id, coupon_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/stores/' + store_id + "/coupons/" + coupon_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteCoupon(store_id, coupon_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getBillboards = async (city_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/billboards?city_id=' + city_id, {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getBillboards(city_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveBillboard = async (billboard_id, city_id, address, text, latitude, longitude, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('city_id', city_id);
        formData.append('address', address);
        formData.append('text', text);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        const response = await fetch('http://34.73.113.72/api/v1/billboards' + (billboard_id ? ("/" + billboard_id) : ""), {
            method: billboard_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveBillboard(billboard_id, city_id, address, text, latitude, longitude, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteBillboard = async (billboard_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/billboards/' + billboard_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteBillboard(billboard_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getMembers = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/members', {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getMembers(callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveMember = async (member_id, name, email, phone, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);

        const response = await fetch('http://34.73.113.72/api/v1/members' + (member_id ? ("/" + member_id) : ""), {
            method: member_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveMember(member_id, name, phone, phone, email));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteMember = async (member_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/members/' + member_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteMember(member_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getCiudades = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/cities', {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getCiudades(callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const getReportes = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/reports', {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getReportes(callback));
        } else {
            const json = await response.json();
            console.log(json);
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const getPromos = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/promos', {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getPromos(callback));
        } else {
            const json = await response.json();
            console.log(json);
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const savePromo = async (promo_id, position, image_file, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('image_file', image_file);
        formData.append('position', position);

        const response = await fetch('http://34.73.113.72/api/v1/promos' + (promo_id ? ("/" + promo_id) : ""), {
            method: promo_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => savePromo(promo_id, position, image_file, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deletePromo = async (promo_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/api/v1/promos/' + promo_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deletePromo(promo_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}
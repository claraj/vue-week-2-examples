const url = 'http://localhost:3000/students/'

const config = axios.create( {
    baseURL: url,
    headers: {'Content-Type': 'application/json'}
})

function addStudent( student ) {
    return config.post('', student).then(response => response.data )
}

function setStudentPresent(id, present) {
    return config.patch(`${id}`, {present: present}).then( response => response.data )
}

function getAllStudents() {
    // GET  /students?_sort=name&_order=asc
    let params = {_sort: 'name', _order: 'asc'}
    return config.get( '', {params: params} ).then(response => response.data )
}

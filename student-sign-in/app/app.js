let app = new Vue({
    el: "#app",
    data: {
        newStudentName: '',
        newStarID: '',
        students: [],
        mostRecentSignIn: '',
        message: '',
        seeMessage: false,
        errors: []
    },
    mounted() {
        this.errors = [] 
        this.updateStudentList()
    },
    methods: {
        addStudent() {
            this.errors = [] 
            if (this.newStudentName && this.newStarID) {
                let student = { name: this.newStudentName, starID: this.newStarID, present: false }
                addStudent(student)
                    .then( student => {
                        console.log('added response', student)  // just for debugging  
                        this.updateStudentList()
                        this.newStudentName = ''
                        this.newStarID = ''
                    })
                    .catch(err => this.errors.push(err))
            } else {
                this.errors.push('Name and StarID are required.')
            }
        },
        updateStudentList() {
            this.errors = [] 
            getAllStudents()
                .then( students => this.students = students)
                .catch( err => this.errors.push(err)) 
        },
        checked(student) {
            this.errors = [] 
            setStudentPresent(student.id, student.present).then( () => {
                this.message = student.present ? 'Welcome, ' : 'Goodbye, '
                this.mostRecentSignIn = student.name    
                this.showWelcomeMessage()
            }).catch(err => this.errors.push(err))
        },
        showWelcomeMessage() {
            this.seeMessage = true
            setTimeout(() => {
                this.seeMessage = false
            }, 3000)
        }
    }
})
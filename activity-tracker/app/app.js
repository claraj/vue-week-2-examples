let app = new Vue({
    el: "#app",
    data: {
        activity: 'Practice Art',  // If you like, replace in your own activity name e.g. studying, running, playing video games.... 
        when: new Date(),
        howLong: 1,
        type: 'sketching',
        digitalTraditional: 'traditional',   // you may wish to rename this 
        activityRecords: [],
        types: ['sketching', 'drawing', 'painting'],    // replace with appropriate options for your activity e.g. for video game, ['PC', 'PlayStation', 'Xbox' ]
        digital: 'digital',          // on a computer, tablet                // replace with appropriate options for your activity e.g. for video games, single player and multi player 
        traditional: 'traditional',   // painting, drawing etc. on paper
        error: ''
    },
    methods: {
        setWhen(event) {
            let dateString = event.target.value
            console.log('string', dateString)
            let date = new Date(dateString)
            // add timezone offset for this browser 
            let timestamp = date.getTime() + (date.getTimezoneOffset() * 60 * 1000)
            this.when = new Date(timestamp)
        },
        submit() {
            //validate 
            if (typeof (this.howLong) != "number" || this.howLong <= 0) {
                this.error = 'The number of hours must be a number greater than zero.'
                return
            }

            if (this.when.getTime() > new Date().getTime()) {
                this.error = 'The date must be today or in the past'
                return
            }

            this.error = ''
            let newActivityRecord = { when: this.when, howLong: this.howLong, type: this.type, digitalTraditional: this.digitalTraditional }
            this.activityRecords.push(newActivityRecord)
            this.activityRecords.sort(function (r1, r2) { return r1.when.getTime() - r2.when.getTime() })
        }
    }, computed: {
        whenInput() {
            let year = this.when.getFullYear()
            let month = (this.when.getMonth() + 1).toString().padStart(2, 0)  // months are zero-indexed
            let day = this.when.getDate().toString().padStart(2, 0)  // day of month  

            let dateString = `${year}-${month}-${day}`
            console.log(dateString)
            return dateString
        },
        totalHours() {
            let total = 0
            if (this.activityRecords.length > 0) {
                total = this.activityRecords.reduce(function (hoursAccumulator, currentRecord) {
                    return hoursAccumulator + currentRecord.howLong
                    print(hoursAccumulator, currentRecord)
                }, 0)
            }
            return total
        },
        totalHoursByType() {
            // fun with functions 
            let hoursByType = {}
            let self = this
            this.types.forEach(function (type) {
                let totalForType = self.activityRecords
                    .filter(function (record) { return record.type === type })
                    .reduce(function (accumulator, current) { return accumulator + current.howLong }, 0)
                hoursByType[type] = totalForType
            })
            return hoursByType
        }
    }, filters: {
        lowercase(string) {
            return string.toLowerCase()
        },
        dateFormat(date) {
            return new Intl.DateTimeFormat().format(date)
        }
    }

})
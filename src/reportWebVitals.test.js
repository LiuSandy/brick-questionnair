const reportWebVitals = require("./reportWebVitals")
// @ponicode
describe("reportWebVitals.default", () => {
    test("0", () => {
        let callFunction = () => {
            reportWebVitals.default(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            reportWebVitals.default(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            reportWebVitals.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

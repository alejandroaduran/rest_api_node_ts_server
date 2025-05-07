describe("Nuestro primer test", () => {
    test("debe revisar 1+1=2", () => {
        expect(1 + 1).toBe(2)
    })

    test("debe revisar 1+1 != 3", () => {
        expect(1 + 1).not.toBe(3)
    })
})
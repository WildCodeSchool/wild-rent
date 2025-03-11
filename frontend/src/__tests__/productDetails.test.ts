import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductDetails from "../pages/ProductDetails";

describe("Product Details", () => {
    describe("calculateDuration", () => {
        it("returns the numbers of location days", () => {
            const startDate = new Date('December 17, 2025 03:24:00');
            const endDate = new Date('December 20, 2025 03:24:00')
            // const endDate = new Date(startDate.setDate(startDate.getDate() + 3));

        })
    })

})
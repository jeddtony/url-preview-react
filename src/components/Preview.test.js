import { render, getByText, screen } from "@testing-library/react";
import React from "react";
import Preview from './Preview';

describe("Preview", () => {
    test('should display text', () => {
        const testInput = "youtube.com"
        const {container} = render(<Preview input={testInput} />)

        expect(screen.findByText(testInput));
        // getByText(screen, "YouTube")

    })
    
})
// NOTE: Mock Test
jest.unmock('./../component.js');

import { Component } from './../component.js';

describe('Dummy test', () => {
    it('true should be true', () => {
        expect(true).toBe(true);
    });
});
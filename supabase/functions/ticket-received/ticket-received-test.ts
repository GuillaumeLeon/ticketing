// deno-test.ts

// Import required libraries and modules
import { assertEquals } from 'https://deno.land/std@0.192.0/testing/asserts.ts';
import { parseNames } from './index.ts';

const testParseFromDefault = async () => {
    const { firstname, lastname } = parseNames('Guillaume Leon <Guillaume.Leon@protonmail.com>');
    // Assert that the function returned the expected result
    assertEquals(firstname, 'Guillaume');
    assertEquals(lastname, 'Leon');
};

const testParseFromIncomplete = async () => {
    const { firstname, lastname } = parseNames('Guillaume <Guillaume.Leon@protonmail.com>');
    // Assert that the function returned the expected result
    assertEquals(firstname, 'Guillaume');
    assertEquals(lastname, null);
};

const testParseFromUnexisting = async () => {
    const { firstname, lastname } = parseNames('<Guillaume.Leon@protonmail.com>');
    // Assert that the function returned the expected result
    assertEquals(firstname, 'Guillaume.Leon');
    assertEquals(lastname, null);
};

// Register and run the tests
Deno.test('Firstname and lastname are parsed', testParseFromDefault);
Deno.test('Firstname is parsed', testParseFromIncomplete);
Deno.test('Firstname is start of email adress', testParseFromUnexisting);

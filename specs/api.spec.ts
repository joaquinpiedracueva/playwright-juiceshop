import { test, expect } from '../test';

interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

function createBookingData(overrides?: Partial<BookingData>): BookingData {
  const id = Math.floor(Math.random() * 10000);
  return {
    firstname: `First_${id}`,
    lastname: `Last_${id}`,
    totalprice: Math.floor(Math.random() * 500) + 1,
    depositpaid: [true, false][Math.floor(Math.random() * 2)],
    bookingdates: {
      checkin: `2026-12-${String(Math.floor(Math.random() * 31) + 1).padStart(2, '0')}`,
      checkout: `2027-01-${String(Math.floor(Math.random() * 31) + 1).padStart(2, '0')}`,
    },
    additionalneeds: ['Breakfast', 'Lunch', 'Dinner'][Math.floor(Math.random() * 3)],
    ...overrides,
  };
}

test.describe('API Tests', () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    // Get auth token
    const response = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });
    const body = await response.json();
    token = body.token;
  });

  // A simple health check endpoint to confirm whether the API is up and running
  test('should return 201 for health check', async ({ request }) => {
    const response = await request.get('/ping');
    const body = await response.text();

    expect(response.status()).toBe(201);
    expect(body).toBe('Created');
  });

  // Creates a new auth token to use for access to the PUT and DELETE /booking
  test('should create auth token', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.token).toBeDefined();
  });

  // Returns the ids of all the bookings that exist within the API
  test('should get booking ids', async ({ request }) => {
    const response = await request.get('/booking');
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0].bookingid).toBeDefined();
  });

  // Creates a new booking in the API
  test('should create a booking', async ({ request }) => {
    const bookingData = createBookingData();

    const response = await request.post('/booking', {
      data: bookingData,
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.bookingid).toBeDefined();
    expect(body.booking.firstname).toBe(bookingData.firstname);
    expect(body.booking.lastname).toBe(bookingData.lastname);
    expect(body.booking.totalprice).toBe(bookingData.totalprice);
    expect(body.booking.depositpaid).toBe(bookingData.depositpaid);
    expect(body.booking.bookingdates).toEqual(bookingData.bookingdates);
    expect(body.booking.additionalneeds).toBe(bookingData.additionalneeds);
  });

  // Returns a specific booking based upon the booking id provided
  test('should get a booking by id', async ({ request }) => {
    const bookingData = createBookingData();

    const postResponse = await request.post('/booking', {
      data: bookingData,
    });
    const postBody = await postResponse.json();
    expect(postResponse.status()).toBe(200);
    expect(postBody.bookingid).toBeDefined();

    const getResponse = await request.get(`/booking/${postBody.bookingid}`);
    const getBody = await getResponse.json();

    expect(getResponse.status()).toBe(200);
    expect(getBody.firstname).toBe(bookingData.firstname);
    expect(getBody.lastname).toBe(bookingData.lastname);
    expect(getBody.totalprice).toBe(bookingData.totalprice);
    expect(getBody.depositpaid).toBe(bookingData.depositpaid);
    expect(getBody.bookingdates).toEqual(bookingData.bookingdates);
    expect(getBody.additionalneeds).toBe(bookingData.additionalneeds);
  });

  // Updates a current booking
  test('should update a booking', async ({ request }) => {
    const bookingData = createBookingData();

    const postResponse = await request.post('/booking', {
      data: bookingData,
    });
    const postBody = await postResponse.json();
    expect(postResponse.status()).toBe(200);
    expect(postBody.bookingid).toBeDefined();

    const updatedData = createBookingData({
      firstname: 'Jane',
      lastname: 'Smith',
    });

    const putResponse = await request.put(`/booking/${postBody.bookingid}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: updatedData,
    });
    const putBody = await putResponse.json();

    expect(putResponse.status()).toBe(200);
    expect(putBody.firstname).toBe(updatedData.firstname);
    expect(putBody.lastname).toBe(updatedData.lastname);
    expect(putBody.totalprice).toBe(updatedData.totalprice);
    expect(putBody.depositpaid).toBe(updatedData.depositpaid);
    expect(putBody.bookingdates).toEqual(updatedData.bookingdates);
    expect(putBody.additionalneeds).toBe(updatedData.additionalneeds);
  });

  // Updates a current booking with a partial payload
  test('should partially update a booking', async ({ request }) => {
    const bookingData = createBookingData();

    const postResponse = await request.post('/booking', {
      data: bookingData,
    });
    const postBody = await postResponse.json();
    expect(postResponse.status()).toBe(200);
    expect(postBody.bookingid).toBeDefined();

    const patchData = { firstname: 'Updated' };

    const patchResponse = await request.patch(`/booking/${postBody.bookingid}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: patchData,
    });
    const patchBody = await patchResponse.json();

    expect(patchResponse.status()).toBe(200);
    expect(patchBody.firstname).toBe(patchData.firstname);
    expect(patchBody.lastname).toBe(bookingData.lastname);
    expect(patchBody.totalprice).toBe(bookingData.totalprice);
    expect(patchBody.depositpaid).toBe(bookingData.depositpaid);
    expect(patchBody.bookingdates).toEqual(bookingData.bookingdates);
    expect(patchBody.additionalneeds).toBe(bookingData.additionalneeds);
  });

  // Deletes a current booking
  test('should delete a booking', async ({ request }) => {
    const bookingData = createBookingData();

    const postResponse = await request.post('/booking', {
      data: bookingData,
    });
    const postBody = await postResponse.json();
    expect(postResponse.status()).toBe(200);
    expect(postBody.bookingid).toBeDefined();

    const deleteResponse = await request.delete(`/booking/${postBody.bookingid}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    const deleteBody = await deleteResponse.text();

    expect(deleteResponse.status()).toBe(201);
    expect(deleteBody).toBe('Created');
  });
});

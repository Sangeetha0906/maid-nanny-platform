const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getHelperProfile = async (userId) => {
  const res = await fetch(`${API_URL}/helpers?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch helper profile');
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const getHelpers = async (type = null) => {
  let query = '';
  if (type === 'All') query = '?all=true';
  else if (type) query = `?type=${type}`;
  
  const res = await fetch(`${API_URL}/helpers${query}`);
  if (!res.ok) throw new Error('Failed to fetch helpers');
  return res.json();
};

export const createBooking = async (data) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Booking failed');
  return res.json();
};

export const getHelperById = async (id) => {
  const res = await fetch(`${API_URL}/helpers/${id}`);
  if (!res.ok) throw new Error('Failed to fetch helper details');
  return res.json();
};

export const getBookings = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/bookings?${query}`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update booking');
  return res.json();
};

export const getAdminStats = async () => {
  const res = await fetch(`${API_URL}/admin/stats`);
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  return res.json();
};

export const verifyHelper = async (id, verified) => {
  const res = await fetch(`${API_URL}/helpers/${id}/verify`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ verified })
  });
  if (!res.ok) throw new Error('Failed to verify helper');
  return res.json();
};

export const createReview = async (data) => {
  const res = await fetch(`${API_URL}/bookings/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to submit review');
  return res.json();
};

export const createComplaint = async (data) => {
  const res = await fetch(`${API_URL}/platform/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to submit complaint');
  return res.json();
};

export const getComplaints = async () => {
  const res = await fetch(`${API_URL}/platform/complaints`);
  if (!res.ok) throw new Error('Failed to fetch complaints');
  return res.json();
};

export const resolveComplaint = async (id) => {
  const res = await fetch(`${API_URL}/platform/complaints/${id}/resolve`, {
    method: 'PATCH'
  });
  if (!res.ok) throw new Error('Failed to resolve complaint');
  return res.json();
};

export const updateAttendance = async (id, type) => {
  const res = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [type]: true })
  });
  if (!res.ok) throw new Error('Failed to update attendance');
  return res.json();
};

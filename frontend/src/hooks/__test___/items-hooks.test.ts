import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useItems, useAddItem, useUpdateItem, useDeleteItem } from '../useItems';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { createWrapper } from '../../test/test-utils';

const API_URL = 'http://localhost:8082/api/products';

const mockItems = [
  { id: 1, name: 'Item A', description: 'Description A', price: 10 },
  { id: 2, name: 'Item B', description: 'Description B', price: 20 },
];

// Mock server
const server = setupServer(
  http.get(API_URL, async () => {
    await delay(50);
    return HttpResponse.json(mockItems);
  }),

  http.post(API_URL, async ({ request }) => {
    const body = await request.json();
    const item = typeof body === 'object' && body !== null ? body : {};
    return HttpResponse.json({ id: 99, ...item }, { status: 201 });
  }),

  http.put(`${API_URL}/:id`, async ({ request, params }) => {
    const body = await request.json();
    const item = typeof body === 'object' && body !== null ? body : {};
    return HttpResponse.json({ ...item, id: Number(params.id) });
  }),

  http.delete(`${API_URL}/:id`, async () => {
    return new HttpResponse(null, { status: 204 });
  })
);

const wrapper = createWrapper();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('React Query hooks: useItems, useAddItem, useUpdateItem, useDeleteItem', () => {
  it('useItems: should fetch items successfully', async () => {
    const { result } = renderHook(() => useItems(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe('Item A');
  });

  it('useAddItem: should add an item successfully', async () => {
    const { result } = renderHook(() => useAddItem(), { wrapper });

    result.current.mutate({ name: 'New Item', description: 'New Desc', price: 50 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useUpdateItem: should update an item successfully', async () => {
    const { result } = renderHook(() => useUpdateItem(), { wrapper });

    result.current.mutate({
      id: 1,
      name: 'Updated Item',
      description: 'Updated Desc',
      price: 99,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useDeleteItem: should delete an item successfully', async () => {
    const { result } = renderHook(() => useDeleteItem(), { wrapper });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

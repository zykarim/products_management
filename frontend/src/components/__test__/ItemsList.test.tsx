import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ItemList from '../ItemList';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

// Replace with your real API base if different
const API_URL = 'http://localhost:8082/api/products';

const mockItems = [
  { id: 1, name: 'Product A', description: 'Description A', price: 100 },
  { id: 2, name: 'Product B', description: 'Description B', price: 200 },
];

let currentItems = [...mockItems];

// MSW Handlers
const server = setupServer(
  http.get(API_URL, () => {
    return HttpResponse.json(currentItems);
  }),

  http.delete(`${API_URL}/:id`, ({ params }) => {
    const id = Number(params.id);
    currentItems = currentItems.filter((item) => item.id !== id);
    return HttpResponse.json({ message: 'Deleted' });
  }),

  http.put(`${API_URL}/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const updated = await request.json();
    currentItems = currentItems.map((item) =>
      item.id === id && typeof updated === 'object' && updated !== null
        ? { ...item, ...updated }
        : item
    );
    return HttpResponse.json(updated);
  })
);

// Helpers
const createTestClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = createTestClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

// Setup
beforeAll(() => server.listen());
afterEach(() => {
  currentItems = [...mockItems]; // Reset after each test
  server.resetHandlers();
});
afterAll(() => server.close());

// Tests
describe('ItemList component', () => {
  it('renders list of products', async () => {
    renderWithClient(<ItemList />);
    expect(await screen.findByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  it('deletes a product when delete button is clicked', async () => {
    renderWithClient(<ItemList />);
    expect(await screen.findByText('Product A')).toBeInTheDocument();

    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Product A')).not.toBeInTheDocument();
    });
  });

  it('opens edit modal and updates item', async () => {
    renderWithClient(<ItemList />);
    expect(await screen.findByText('Product A')).toBeInTheDocument();

    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue('Product A');
    fireEvent.change(input, { target: { value: 'Updated A' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Updated A')).toBeInTheDocument();
    });
  });

  it('closes modal on cancel', async () => {
    renderWithClient(<ItemList />);
    const editButton = await screen.findAllByText('Edit');
    fireEvent.click(editButton[0]);

    expect(screen.getByText('Edit Item')).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('Edit Item')).not.toBeInTheDocument();
    });
  });
});

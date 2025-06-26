import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ItemForm from '../ItemForm';

// Mock `useNavigate`
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Mock `useAddItem`
const mutateMock = vi.fn();
vi.mock('../../hooks/useItems', async () => {
  const actual = await vi.importActual('../../hooks/useItems');
  return {
    ...actual,
    useAddItem: () => ({
      mutate: mutateMock,
    }),
  };
});

const createTestClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = createTestClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('ItemForm component', () => {
  beforeEach(() => {
    mutateMock.mockReset();
    navigateMock.mockReset();
  });

  it('renders the form inputs', () => {
    renderWithClient(<ItemForm />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  it('submits the form and navigates back', async () => {
    renderWithClient(<ItemForm />);

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Test Product' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: 123 },
    });

    fireEvent.click(screen.getByText('Add Item'));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        name: 'Test Product',
        description: 'Test Description',
        price: 123,
      });
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });
});

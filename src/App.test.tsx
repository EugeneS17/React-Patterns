import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { Launch } from './types/launch';

const mockLaunches: Launch[] = [
  {
    flight_number: 84,
    mission_name: 'Starlink 2',
    mission_id: [],
    upcoming: false,
    launch_year: '2020',
    launch_date_unix: 1580825940,
    launch_date_utc: '2020-02-04T09:19:00.000Z',
    launch_date_local: '2020-02-04T04:19:00-05:00',
    is_tentative: false,
    tentative_max_precision: 'hour',
    tbd: false,
    launch_window: 0,
    rocket: {
      rocket_id: 'falcon9',
      rocket_name: 'Falcon 9',
      rocket_type: 'FT',
    },
    ships: [],
    launch_site: {
      site_id: 'ccafs_slc_40',
      site_name: 'CCAFS SLC 40',
      site_name_long: 'Cape Canaveral Air Force Station Space Launch Complex 40',
    },
    launch_success: true,
    links: {
      mission_patch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      mission_patch_small: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png',
    },
    details: 'This mission will launch the second batch of Starlink satellites.',
    static_fire_date_utc: null,
    static_fire_date_unix: null,
    timeline: null,
    crew: null,
  },
  {
    flight_number: 85,
    mission_name: 'Starlink 3',
    mission_id: [],
    upcoming: false,
    launch_year: '2020',
    launch_date_unix: 1581384300,
    launch_date_utc: '2020-02-11T10:05:00.000Z',
    launch_date_local: '2020-02-11T05:05:00-05:00',
    is_tentative: false,
    tentative_max_precision: 'hour',
    tbd: false,
    launch_window: 0,
    rocket: {
      rocket_id: 'falcon9',
      rocket_name: 'Falcon 9',
      rocket_type: 'FT',
    },
    ships: [],
    launch_site: {
      site_id: 'ccafs_slc_40',
      site_name: 'CCAFS SLC 40',
      site_name_long: 'Cape Canaveral Air Force Station Space Launch Complex 40',
    },
    launch_success: true,
    links: {
      mission_patch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      mission_patch_small: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png',
    },
    details: null,
    static_fire_date_utc: null,
    static_fire_date_unix: null,
    timeline: null,
    crew: null,
  },
];

describe('SpaceX Launches App - Main Scenarios', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('should fetch and display launches from 2020', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockLaunches,
    });

    render(<App />);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spacexdata.com/v3/launches?launch_year=2020'
    );

    await waitFor(() => {
      expect(screen.getByText('Starlink 2')).toBeInTheDocument();
      expect(screen.getByText('Starlink 3')).toBeInTheDocument();
    });
  });

  it('should display error message when API request fails', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });
  });

  it('should open modal with launch details when "See more" is clicked', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockLaunches,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Starlink 2')).toBeInTheDocument();
    });

    const seeMoreButtons = screen.getAllByText('See more');
    await user.click(seeMoreButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Mission name:')).toBeInTheDocument();
      expect(screen.getByText('Rocket name:')).toBeInTheDocument();
      expect(screen.getByText('Details:')).toBeInTheDocument();
      expect(
        screen.getByText('This mission will launch the second batch of Starlink satellites.')
      ).toBeInTheDocument();
    });
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockLaunches,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Starlink 2')).toBeInTheDocument();
    });

    const seeMoreButtons = screen.getAllByText('See more');
    await user.click(seeMoreButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Mission name:')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Mission name:')).not.toBeInTheDocument();
    });
  });
});

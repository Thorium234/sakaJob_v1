import { API_BASE_URL } from '@/constants/theme';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${this.baseUrl}${path}`, { ...options, headers });

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(body.error || `HTTP ${res.status}`);
    }

    return res.json();
  }

  get<T>(path: string) {
    return this.request<T>(path);
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
  }

  put<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined });
  }

  patch<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined });
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }

  // Auth
  auth = {
    register: (data: any) => this.post<{ user: any; token: string }>('/auth/register', data),
    login: (data: { email: string; password: string }) =>
      this.post<{ user: any; token: string }>('/auth/login', data),
    me: () => this.get<{ user: any }>('/auth/me'),
  };

  // Jobs
  jobs = {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.get<{ jobs: any[]; pagination: any }>(`/jobs${qs}`);
    },
    get: (id: string) => this.get<{ job: any }>(`/jobs/${id}`),
    create: (data: any) => this.post<{ job: any }>('/jobs', data),
    update: (id: string, data: any) => this.put<{ job: any }>(`/jobs/${id}`, data),
    close: (id: string) => this.delete<{ message: string }>(`/jobs/${id}`),
    mine: () => this.get<{ jobs: any[] }>('/jobs/employer/mine'),
    matches: () => this.get<{ jobs: any[] }>('/jobs/matches'),
  };

  // Applications
  applications = {
    apply: (jobId: string, data?: { coverLetter?: string }) =>
      this.post<{ application: any }>(`/applications/${jobId}/apply`, data),
    mine: () => this.get<{ applications: any[] }>('/applications/mine'),
    forJob: (jobId: string) => this.get<{ applications: any[] }>(`/applications/job/${jobId}`),
    updateStatus: (id: string, status: string) =>
      this.patch<{ application: any }>(`/applications/${id}/status`, { status }),
  };

  // Profile
  profile = {
    get: (userId: string) => this.get<{ user: any }>(`/profile/${userId}`),
    update: (data: any) => this.put<{ user: any }>('/profile', data),
  };

  // Messages
  messages = {
    conversations: () => this.get<{ conversations: any[] }>('/messages/conversations/list'),
    get: (userId: string) => this.get<{ messages: any[] }>(`/messages/${userId}`),
    send: (receiverId: string, content: string, jobId?: string) =>
      this.post<{ message: any }>('/messages', { receiverId, content, jobId }),
    unreadCount: () => this.get<{ count: number }>('/messages/unread/count'),
  };

  // Reviews
  reviews = {
    create: (revieweeId: string, data: { rating: number; comment?: string; jobId?: string }) =>
      this.post<{ review: any }>('/reviews', { revieweeId, ...data }),
    forUser: (userId: string) => this.get<{ reviews: any[]; averageRating: number; totalReviews: number }>(`/reviews/user/${userId}`),
  };

  // Notifications
  notifications = {
    list: () => this.get<{ notifications: any[] }>('/notifications'),
    markRead: (id: string) => this.patch<{ success: boolean }>(`/notifications/${id}/read`),
    markAllRead: () => this.patch<{ success: boolean }>('/notifications/read-all'),
  };

  // Lookup
  lookup = {
    jobCategories: () => this.get<{ categories: string[] }>('/lookup/job-categories'),
    employmentTypes: () => this.get<{ types: string[] }>('/lookup/employment-types'),
    experienceLevels: () => this.get<{ levels: string[] }>('/lookup/experience-levels'),
    counties: () => this.get<{ counties: string[] }>('/lookup/counties'),
  };
}

export const api = new ApiClient();

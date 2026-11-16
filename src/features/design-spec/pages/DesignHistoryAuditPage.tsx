"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutGrid,
  List,
  Search,
  Layers,
  MessageSquareDiff,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ExternalLink,
  Monitor,
  Image as ImageIcon,
  Sparkles,
  Filter,
  X,
  Maximize2,
  History,
  FileEdit,
  Pin,
  ArrowRight,
  RefreshCw,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { designSpecService } from '../services/designSpecService';
import type {
  ModuleAuditSummary,
  DesignPinChangeRequest,
  PinSummaryItem,
} from '../types/designSpec.types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const DesignHistoryAuditPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialView = (searchParams?.get('view') as 'grid' | 'list') || 'list';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView);

  const [modules, setModules] = useState<ModuleAuditSummary[]>([]);
  const [auditLogs, setAuditLogs] = useState<DesignPinChangeRequest[]>([]);
  const [allPins, setAllPins] = useState<PinSummaryItem[]>([]);
  const [totalPins, setTotalPins] = useState(0);
  const [totalChanges, setTotalChanges] = useState(0);
  const [allAuthors, setAllAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedPinId, setSelectedPinId] = useState<string>('all');
  const [activityType, setActivityType] = useState<string>('all');

  // Image Preview Lightbox State
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
    routeKey?: string;
    screenName?: string;
    moduleName?: string;
    timestamp?: string;
  } | null>(null);

  // Keyboard shortcut listener to close image lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await designSpecService.getDesignHistory({
        module: selectedModule !== 'all' ? selectedModule : undefined,
        author: selectedAuthor !== 'all' ? selectedAuthor : undefined,
        pinId: selectedPinId !== 'all' ? selectedPinId : undefined,
        recordType: ['spec_created', 'change_requested', 'spec_updated', 'approved'].includes(
          activityType
        )
          ? activityType
          : undefined,
      });
      setModules(res.data?.modules || []);
      setAuditLogs(res.data?.auditLogs || []);
      setTotalPins(res.data?.totalPins || 0);
      setTotalChanges(res.data?.totalChanges || 0);
      setAllAuthors(res.data?.allAuthors || []);
      if (res.data?.allPins) {
        setAllPins(res.data.allPins);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load design history & audit logs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [selectedModule, selectedAuthor, selectedPinId, activityType]);

  // Sync viewMode with query param
  const switchViewMode = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    params.set('view', mode);
    router.replace(`?${params.toString()}`);
  };

  // Compute unique elements / pins for element-specific history filtering
  const uniquePins = useMemo(() => {
    const map = new Map<string, PinSummaryItem>();
    allPins.forEach((p) => {
      if (p.id) map.set(p.id, p);
    });
    auditLogs.forEach((log) => {
      if (log.pin_id && !map.has(log.pin_id)) {
        map.set(log.pin_id, {
          id: log.pin_id,
          title: log.pin_title || 'Pinned Element',
          module_name: log.module_name,
          screen_name: log.screen_name,
          route_key: log.route_key,
        });
      }
    });
    return Array.from(map.values());
  }, [allPins, auditLogs]);

  // Filter audit logs by search query, author, element, and activity type
  const filteredAuditLogs = auditLogs.filter((log) => {
    if (selectedPinId !== 'all') {
      if (log.pin_id !== selectedPinId) return false;
    }

    if (selectedAuthor !== 'all') {
      const qAuthor = selectedAuthor.toLowerCase();
      const match =
        log.requested_by?.toLowerCase() === qAuthor ||
        log.feature_owner_name?.toLowerCase() === qAuthor;
      if (!match) return false;
    }

    if (activityType !== 'all') {
      if (log.record_type !== activityType) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        log.pin_title?.toLowerCase().includes(q) ||
        log.request_notes?.toLowerCase().includes(q) ||
        log.requested_by?.toLowerCase().includes(q) ||
        log.feature_owner_name?.toLowerCase().includes(q) ||
        log.module_name?.toLowerCase().includes(q) ||
        log.screen_name?.toLowerCase().includes(q) ||
        log.element_text?.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    return true;
  });

  // Filter modules by search query in grid view
  const filteredModules = modules.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.moduleName.toLowerCase().includes(q) ||
      Object.keys(m.screens).some((s) => s.toLowerCase().includes(q))
    );
  });

  const approvedCount = useMemo(() => {
    return auditLogs.filter((l) => l.record_type === 'approved').length;
  }, [auditLogs]);

  const changeRequestCount = useMemo(() => {
    return auditLogs.filter((l) => l.record_type === 'change_requested').length;
  }, [auditLogs]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-slate-100 font-semibold">Design Specs & History</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Pin className="w-5 h-5 rotate-45" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Design Specs & Audit History
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Chronological audit trail of element pins, user comments, and client approvals
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => switchViewMode('list')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer',
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                <List className="w-3.5 h-3.5" />
                Audit Logs ({filteredAuditLogs.length})
              </button>
              <button
                onClick={() => switchViewMode('grid')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Modules ({filteredModules.length})
              </button>
            </div>

            <button
              onClick={fetchHistory}
              title="Refresh"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin text-blue-600')} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-6">
        {/* KPI Metrics Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Modules
              </span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {modules.length}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Active across application
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Pinned Specs
              </span>
              <Pin className="w-4 h-4 text-purple-600 rotate-45" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {totalPins}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Interactive documented elements
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Change Requests
              </span>
              <MessageSquareDiff className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {changeRequestCount}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Logged feedback & iterations
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Client Approvals
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {approvedCount}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Signed off with hash audit
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search specs, feedback, authors, components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Module Filter */}
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full md:w-48 py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Modules</option>
              {modules.map((m) => (
                <option key={m.moduleName} value={m.moduleName}>
                  {m.moduleName} ({m.pinsCount})
                </option>
              ))}
            </select>

            {/* Author Filter */}
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full md:w-44 py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Authors</option>
              {allAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>

            {/* Pinned Element Filter */}
            <select
              value={selectedPinId}
              onChange={(e) => setSelectedPinId(e.target.value)}
              className="w-full md:w-56 py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Pinned Elements</option>
              {uniquePins.map((pin) => (
                <option key={pin.id} value={pin.id}>
                  {pin.title}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Activity:
            </span>
            {[
              { id: 'all', label: 'All Activities' },
              { id: 'spec_created', label: 'Spec Created', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
              { id: 'change_requested', label: 'Change Requested', color: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
              { id: 'approved', label: 'Client Approved', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
              { id: 'spec_updated', label: 'Spec Updated', color: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivityType(tab.id)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer',
                  activityType === tab.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === 'list' ? (
          /* List / Table View */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Chronological Audit Trail
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {filteredAuditLogs.length} audit event
                  {filteredAuditLogs.length === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            {filteredAuditLogs.length === 0 ? (
              <div className="py-20 text-center space-y-2">
                <History className="w-9 h-9 text-slate-300 dark:text-slate-600 mx-auto" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  No audit logs found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Try adjusting your search criteria, author filter, or activity type filter.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAuditLogs.map((log) => {
                  const isApproved = log.record_type === 'approved';
                  const isChange = log.record_type === 'change_requested';
                  const isCreated = log.record_type === 'spec_created';
                  const isUpdated = log.record_type === 'spec_updated';

                  return (
                    <div
                      key={log.id}
                      className="p-6 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Event Icon */}
                        <div
                          className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs',
                            isApproved && 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/50',
                            isChange && 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/50',
                            isCreated && 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/50',
                            isUpdated && 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200/50'
                          )}
                        >
                          {isApproved && <ShieldCheck className="w-5 h-5" />}
                          {isChange && <MessageSquareDiff className="w-5 h-5" />}
                          {isCreated && <Pin className="w-5 h-5 rotate-45" />}
                          {isUpdated && <FileEdit className="w-5 h-5" />}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span
                              className={cn(
                                'text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full',
                                isApproved && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
                                isChange && 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
                                isCreated && 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
                                isUpdated && 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300'
                              )}
                            >
                              {isApproved && 'Approved'}
                              {isChange && 'Change Requested'}
                              {isCreated && 'Spec Created'}
                              {isUpdated && 'Spec Updated'}
                            </span>

                            {log.module_name && (
                              <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                                {log.module_name}
                              </span>
                            )}

                            {log.screen_name && (
                              <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                                {log.screen_name}
                              </span>
                            )}

                            <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                              <Clock className="w-3 h-3" />
                              {new Date(log.created_at).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>

                          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                            {log.pin_title || 'Element Specification'}
                          </h4>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                            {log.request_notes || log.pin_description || 'No description provided'}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-slate-500 dark:text-slate-400">
                            <span>
                              By:{' '}
                              <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                                {log.requested_by || log.feature_owner_name || 'Admin'}
                              </strong>
                            </span>
                            {log.route_key && (
                              <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                                {log.route_key}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Action */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        {log.screenshot_url && (
                          <button
                            onClick={() =>
                              setPreviewImage({
                                url: log.screenshot_url!,
                                title: log.pin_title || 'Screenshot Attachment',
                                routeKey: log.route_key,
                                screenName: log.screen_name,
                                moduleName: log.module_name,
                                timestamp: log.created_at,
                              })
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                            Screenshot
                          </button>
                        )}

                        {log.route_key && (
                          <Link
                            href={log.route_key}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
                          >
                            Inspect Screen
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Grid / Modules View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((mod) => (
              <div
                key={mod.moduleName}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                      {mod.screensCount} Screen{mod.screensCount === 1 ? '' : 's'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-3">
                    {mod.moduleName}
                  </h3>

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Pin className="w-3.5 h-3.5 text-purple-600 rotate-45" />
                      <span>{mod.pinsCount} Pinned Specs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquareDiff className="w-3.5 h-3.5 text-amber-500" />
                      <span>{mod.changesCount} Changes</span>
                    </div>
                  </div>
                </div>

                {/* Screens Breakdown */}
                <div className="p-5 flex-1 bg-slate-50/50 dark:bg-slate-950/40 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Documented Screens
                  </span>
                  <div className="space-y-2">
                    {Object.entries(mod.screens).map(([sName, sData]) => (
                      <div
                        key={sName}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs hover:border-blue-500 transition-colors shadow-2xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {sName}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            {sData.routeKey}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold px-2 py-0.5 rounded">
                            {sData.pinsCount} pins
                          </span>
                          <Link
                            href={sData.routeKey}
                            title="Inspect in application"
                            className="p-1 rounded text-slate-400 hover:text-blue-600"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Screenshots */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[200000] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {previewImage.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {previewImage.screenName || previewImage.routeKey}
                </p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-slate-100 dark:bg-slate-950 flex items-center justify-center max-h-[70vh] overflow-auto">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="rounded-lg shadow-sm max-w-full max-h-[65vh] object-contain"
              />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignHistoryAuditPage;

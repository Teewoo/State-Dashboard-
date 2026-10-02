import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Building2,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { FilterState } from '../types';
import { queryRagAssistant, RagResponse } from '../utils/ragEngine';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  ragData?: RagResponse;
}

interface AskHeliumMumDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onClearFilters: () => void;
  facilityNameMap: Record<string, string>;
}

const SAMPLE_QUESTIONS = [
  'Summarise the programme performance for an executive meeting.',
  'Which state has the lowest ANC completion rate?',
  'Which facilities are below the ANC completion target?',
  'How is maternal mortality incidence trending?',
  'What should I pay attention to this month?',
  'Why has facility delivery changed over the selected period?',
  'What changed in Lagos this quarter?',
  'Which facilities have both low ANC completion and late reporting?',
  'What are the main reasons for complication referrals?',
  'Show me the five facilities with the largest improvement.',
  'Compare Lagos and Delta over the last six months.',
];

export const AskHeliumMumDrawer: React.FC<AskHeliumMumDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onClearFilters,
  facilityNameMap,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Welcome to Ask HeliumMum. I am your RAG programme analytical assistant, grounded exclusively in your filtered dashboard dataset. Ask me about maternal outcomes, ANC retention, facility benchmarks, or operational priorities.',
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedFacilityLabel =
    filters.selectedFacilityId === 'All'
      ? 'All facilities'
      : facilityNameMap[filters.selectedFacilityId] || filters.selectedFacilityId;

  const dateRangeLabel =
    filters.dateRange === '3m'
      ? 'Last 3 months'
      : filters.dateRange === '6m'
      ? 'Last 6 months'
      : 'Last 12 months';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate analytical retrieval delay
    setTimeout(() => {
      const ragResult = queryRagAssistant(textToSend, filters, onClearFilters);
      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: ragResult.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragData: ragResult,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-[#E5E7EB] animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Ask HeliumMum RAG Assistant"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5E7EB] bg-gradient-to-r from-indigo-50/70 via-white to-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-sm font-bold text-[#111827]">Ask HeliumMum</h2>
                <span className="text-[10px] font-semibold text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-1.5 py-0.2 rounded-xs">
                  Grounded RAG
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280]">
                Analytical decision-support assistant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#111827] p-1.5 rounded-lg hover:bg-[#F3F4F6] transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Context Banner */}
        <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-[#4B5563] truncate">
            <Filter className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
            <span className="text-[#6B7280]">Analysing:</span>
            <span className="font-semibold text-[#111827] truncate">
              {filters.selectedState} · {selectedFacilityLabel} · {dateRangeLabel}
            </span>
          </div>

          {(filters.selectedState !== 'All' ||
            filters.selectedFacilityId !== 'All' ||
            filters.dateRange !== '12m') && (
            <button
              onClick={onClearFilters}
              className="text-[11px] font-medium text-[#4F46E5] hover:text-indigo-800 hover:underline inline-flex items-center space-x-1 shrink-0 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Quick Prompts Carousel if fewer than 3 messages */}
          {messages.length <= 2 && (
            <div className="mb-4">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2">
                Suggested questions from active dataset:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_QUESTIONS.slice(0, 6).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-left text-xs bg-white hover:bg-indigo-50/60 border border-[#E5E7EB] hover:border-indigo-200 text-[#374151] hover:text-[#4F46E5] px-2.5 py-1.5 rounded-lg transition-all shadow-2xs leading-snug"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[92%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#4F46E5] text-white rounded-br-xs'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-bl-xs'
                }`}
              >
                <p className="font-normal">{msg.text}</p>

                {/* Structured RAG Response Blocks */}
                {msg.ragData && (
                  <div className="mt-3.5 space-y-3 pt-3 border-t border-[#E5E7EB]">
                    {/* What the data shows */}
                    {msg.ragData.observations && msg.ragData.observations.length > 0 && (
                      <div>
                        <span className="font-bold text-[11px] uppercase tracking-wider text-[#4B5563] block mb-1">
                          What the data shows
                        </span>
                        <ul className="space-y-1 text-[#374151]">
                          {msg.ragData.observations.map((obs, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-[#4F46E5] font-bold">•</span>
                              <span>{obs}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benchmark Comparison */}
                    {msg.ragData.benchmarkComparison && (
                      <div className="bg-white rounded-lg border border-[#E5E7EB] p-2.5">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] mb-1">
                          <span>{msg.ragData.benchmarkComparison.metric}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded-xs font-bold text-[10px] ${
                              msg.ragData.benchmarkComparison.status === 'success'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : msg.ragData.benchmarkComparison.status === 'warning'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                          >
                            {msg.ragData.benchmarkComparison.status === 'success'
                              ? 'Target Met'
                              : 'Target Gap'}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between text-xs">
                          <div>
                            <span className="text-[#6B7280]">Current:</span>{' '}
                            <strong className="text-[#111827]">
                              {msg.ragData.benchmarkComparison.currentValue}
                            </strong>
                          </div>
                          <div>
                            <span className="text-[#6B7280]">Target:</span>{' '}
                            <strong className="text-[#111827]">
                              {msg.ragData.benchmarkComparison.target}
                            </strong>
                          </div>
                        </div>
                        <div className="mt-1 text-[11px] text-[#4F46E5] font-medium">
                          {msg.ragData.benchmarkComparison.variance}
                        </div>
                      </div>
                    )}

                    {/* Trend Assessment */}
                    {msg.ragData.trendAssessment && (
                      <div className="flex items-center space-x-2 text-[11px] bg-white rounded-lg border border-[#E5E7EB] p-2">
                        {msg.ragData.trendAssessment.direction === 'Improving' ? (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        ) : msg.ragData.trendAssessment.direction === 'Declining' ? (
                          <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                        )}
                        <span className="text-[#6B7280]">
                          Trend: <strong>{msg.ragData.trendAssessment.direction}</strong> —{' '}
                          {msg.ragData.trendAssessment.detail}
                        </span>
                      </div>
                    )}

                    {/* Facilities to Watch */}
                    {msg.ragData.facilitiesToWatch && msg.ragData.facilitiesToWatch.length > 0 && (
                      <div>
                        <span className="font-bold text-[11px] uppercase tracking-wider text-[#4B5563] block mb-1">
                          Facilities to watch
                        </span>
                        <div className="space-y-1.5">
                          {msg.ragData.facilitiesToWatch.map((fac, fIdx) => (
                            <div
                              key={fIdx}
                              className="bg-white rounded-md border border-[#E5E7EB] p-2 text-[11px]"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[#111827]">{fac.name}</span>
                                <span className="text-[10px] text-[#6B7280] bg-gray-50 px-1 py-0.2 rounded border border-gray-200">
                                  {fac.state}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-[#4B5563] mt-0.5">
                                <span>{fac.metricLabel}: <strong className="text-[#111827]">{fac.value}</strong></span>
                                <span className="text-amber-700 font-medium">{fac.issue}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Follow-up */}
                    {msg.ragData.suggestedFollowUp && (
                      <div className="bg-indigo-50/70 border border-indigo-100 rounded-lg p-2.5 text-[11px] text-[#374151]">
                        <span className="font-bold text-[#4F46E5] block mb-0.5">
                          Suggested Programme Follow-up:
                        </span>
                        <p>{msg.ragData.suggestedFollowUp}</p>
                      </div>
                    )}

                    {/* Safety boundary reminder note */}
                    {msg.ragData.safetyNote && (
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-[10px] text-amber-800 flex items-start space-x-1.5">
                        <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                        <span>{msg.ragData.safetyNote}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#9CA3AF] mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 w-fit">
              <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-[11px]">Grounded analysis of filtered metrics...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* AI Safety Boundary Disclaimer */}
        <div className="px-4 py-2 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center space-x-1.5 text-[10px] text-[#6B7280]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            Answers strictly derived from current dashboard data. ARS risk classifications are
            unaltered.
          </span>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#E5E7EB] bg-white">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about maternal trends, benchmarks, facilities..."
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg pl-3 pr-10 py-2.5 text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputQuery.trim() || isTyping}
              className="absolute right-1.5 p-1.5 text-white bg-[#4F46E5] hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-[#4F46E5] rounded-md transition-colors shadow-2xs"
              aria-label="Submit Question"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

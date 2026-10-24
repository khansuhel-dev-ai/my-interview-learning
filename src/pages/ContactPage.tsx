import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<FormData | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message or question.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Client-side demo submission
    setSubmissionReceipt({ ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
    setSubmissionReceipt(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch & Feedback</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Contact My Interview Learning (MIL)
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Found a typo, have a question regarding JVM internals or thread synchronization, or want to suggest a new Java interview topic? Send a note below.
        </p>
      </div>

      {/* Honest Demo Notification Alert */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-0.5">
            Client-Side Demo Simulation:
          </strong>
          <span>
            This initial release runs purely client-side without an external backend mail server. Submissions will validate form rules and produce a confirmed local receipt without claiming that an external email has dispatched.
          </span>
        </div>
      </div>

      {/* Form or Submission Receipt */}
      {isSubmitted && submissionReceipt ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#12131d] border border-emerald-200 dark:border-emerald-900/40 space-y-6 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                Message Received (Local Demo Receipt)
              </h3>
              <p className="text-xs text-zinc-500">
                Form validation passed successfully.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0c0d12] border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
            <div>
              <span className="font-bold text-zinc-500">Sender:</span>{' '}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{submissionReceipt.name} ({submissionReceipt.email})</span>
            </div>
            <div>
              <span className="font-bold text-zinc-500">Subject:</span>{' '}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{submissionReceipt.subject}</span>
            </div>
            <div>
              <span className="font-bold text-zinc-500">Message Body:</span>
              <p className="mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {submissionReceipt.message}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="p-8 rounded-3xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-xs"
        >
          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Suhel Khan"
              className={`w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-colors ${
                errors.name
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-indigo-500'
              }`}
            />
            {errors.name && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Your Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. learner@example.com"
              className={`w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-colors ${
                errors.email
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-indigo-500'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Subject <span className="text-rose-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Question regarding JVM Stack vs Heap"
              className={`w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-colors ${
                errors.subject
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-indigo-500'
              }`}
            />
            {errors.subject && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Message or Note <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your feedback, question, or note here..."
              className={`w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-colors resize-y ${
                errors.message
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-indigo-500'
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Message (Demo Mode)</span>
          </button>
        </form>
      )}
    </div>
  );
};

import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F5F3] text-[#1C1C1C] flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/20 text-[#D97706] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-display text-[#1C1C1C]">Something Went Wrong</h2>
            <p className="text-xs text-[#4B4B4B] leading-relaxed">
              An unexpected error occurred. Click below to reload the AMK INFRA interface.
            </p>
            {this.state.error && (
              <div className="text-left bg-[#F5F5F3] p-4 rounded-xl border border-red-300 overflow-auto max-h-48 text-xs text-red-600 font-mono">
                <div className="font-bold text-red-700">{this.state.error.toString()}</div>
                <div className="text-[10px] text-[#737373] mt-2 whitespace-pre-wrap">{this.state.error.stack}</div>
              </div>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

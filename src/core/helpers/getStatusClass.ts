export function getStatusClass(status?: 'ok' | 'warn' | 'error' | 'info') {
    switch (status) {
      case 'ok':
        return 'text-terminal-ok';
      case 'warn':
        return 'text-terminal-warn';
      case 'error':
        return 'text-terminal-error';
      case 'info':
      default:
        return 'text-terminal-info';
    }
  }
  
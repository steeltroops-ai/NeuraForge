/**
 * Performance Optimization Utilities
 * Following .qodo Performance Excellence Standards
 * Target: Lighthouse 95+ Score
 */

import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { debounce, throttle } from 'lodash-es';

// Performance Monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure function execution time
  measureFunction<T extends (...args: any[]) => any>(
    name: string,
    fn: T
  ): T {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      this.recordMetric(name, end - start);
      
      if (end - start > 16) { // Warn if > 16ms (60fps threshold)
        console.warn(`Performance warning: ${name} took ${end - start}ms`);
      }
      
      return result;
    }) as T;
  }

  // Record performance metric
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }

  // Get performance statistics
  getStats(name: string): { avg: number; min: number; max: number; count: number } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    return {
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    };
  }

  // Report all metrics
  reportMetrics(): void {
    console.group('Performance Metrics');
    for (const [name, values] of this.metrics) {
      const stats = this.getStats(name);
      if (stats) {
        console.log(`${name}:`, stats);
      }
    }
    console.groupEnd();
  }
}

// Lazy Loading Hook
export const useLazyLoad = <T extends HTMLElement = HTMLElement>(threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Optimized Image Component
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) => {
  const { ref, isVisible } = useLazyLoad<HTMLImageElement>();

  // Generate responsive image URLs
  const generateSrcSet = useCallback((baseSrc: string) => {
    const sizes = [640, 768, 1024, 1280, 1536];
    return sizes
      .map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`)
      .join(', ');
  }, [quality]);

  const sizes = useMemo(() => {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }, []);

  if (!isVisible && !priority) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={className}
        style={{ width, height, backgroundColor: '#1a1a1a' }}
      />
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      srcSet={generateSrcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        filter: placeholder === 'blur' ? 'blur(10px)' : undefined,
        transition: 'filter 0.3s ease',
      }}
      onLoad={(e) => {
        if (placeholder === 'blur') {
          (e.target as HTMLImageElement).style.filter = 'none';
        }
      }}
    />
  );
};

// Virtual Scrolling Hook
export const useVirtualScroll = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = useMemo(() => {
    return items.slice(visibleStart, visibleEnd).map((item, index) => ({
      item,
      index: visibleStart + index,
      top: (visibleStart + index) * itemHeight,
    }));
  }, [items, visibleStart, visibleEnd, itemHeight]);

  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback(
    throttle((e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    }, 16), // 60fps
    []
  );

  return {
    visibleItems,
    totalHeight,
    handleScroll,
  };
};

// Debounced Search Hook
export const useDebouncedSearch = (
  searchFn: (query: string) => Promise<any[]>,
  delay = 300
) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await searchFn(searchQuery);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, delay),
    [searchFn, delay]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  };
};

// Memory Management
export class MemoryManager {
  private static cleanupTasks: (() => void)[] = [];

  static addCleanupTask(task: () => void): void {
    this.cleanupTasks.push(task);
  }

  static cleanup(): void {
    this.cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.error('Cleanup task failed:', error);
      }
    });
    this.cleanupTasks = [];
  }

  static scheduleCleanup(): void {
    // Schedule cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', this.cleanup);
      
      // Also cleanup on visibility change (mobile)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.cleanup();
        }
      });
    }
  }
}

// Bundle Analysis Utilities
export const analyzeBundleSize = () => {
  if (typeof window === 'undefined') return;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  console.group('Bundle Analysis');
  
  scripts.forEach((script, index) => {
    const src = (script as HTMLScriptElement).src;
    console.log(`Script ${index + 1}:`, src);
  });

  styles.forEach((style, index) => {
    const href = (style as HTMLLinkElement).href;
    console.log(`Stylesheet ${index + 1}:`, href);
  });

  console.groupEnd();
};

// Core Web Vitals Monitoring
export const monitorCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay (FID)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  MemoryManager.scheduleCleanup();
  
  // Monitor Core Web Vitals in development
  if (process.env.NODE_ENV === 'development') {
    monitorCoreWebVitals();
  }
}

export default PerformanceMonitor;
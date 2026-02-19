import React from 'react';

export interface DiagnosticResult {
  riskLevel: 'Low' | 'Moderate' | 'Critical';
  estimatedLoss: number;
  recommendation: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  stars: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}
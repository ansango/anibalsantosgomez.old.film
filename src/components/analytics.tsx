"use client";

import type { FC } from "react";

import { GoogleAnalytics } from "nextjs-google-analytics";

export const Analytics: FC = () => <GoogleAnalytics trackPageViews strategy="lazyOnload" />;

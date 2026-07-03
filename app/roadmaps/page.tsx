"use client";

import Link from "next/link";
import { CzBackdrop } from "@/components/cz/CzBackdrop";
import { useCzTheme } from "@/components/cz/useCzTheme";
import { czFontClass } from "@/lib/fonts";
import "./roadmaps.css";

interface Step {
  title: string;
  q: string;
}

interface Track {
  label: string;
  sub: string;
  steps: Step[];
}

/* Curated, syllabus-tagged, in dependency order — dozens not thousands,
   on purpose (PRD §6.4). Each step deep-links into the solver's attempt gate. */
const TRACKS: Track[] = [
  {
    label: "TRACK 01 · ARRAYS & HASHING",
    sub: "one pass beats two loops — the pattern behind half your placement round",
    steps: [
      {
        title: "Two sum",
        q: "Given an array of n integers (n ≤ 10^5) and a target k, return the indices of the two numbers that add up to k. Exactly one solution exists, and you may not use the same element twice.",
      },
      {
        title: "Best time to buy and sell stock",
        q: "Given an array prices where prices[i] is the price of a stock on day i (1 ≤ n ≤ 10^5), find the maximum profit from choosing one day to buy and a later day to sell. Return 0 if no profit is possible.",
      },
      {
        title: "Product of array except self",
        q: "Given an integer array nums of length n (2 ≤ n ≤ 10^5), return an array answer where answer[i] is the product of all elements of nums except nums[i]. You must not use division and must run in O(n) time.",
      },
      {
        title: "Longest consecutive sequence",
        q: "Given an unsorted array of integers (0 ≤ n ≤ 10^5), return the length of the longest run of consecutive integer values (e.g. [100,4,200,1,3,2] → 4 for the run 1,2,3,4). Your algorithm must run in O(n) time.",
      },
      {
        title: "Subarray sum equals K",
        q: "Given an integer array nums (1 ≤ n ≤ 2·10^4, values may be negative) and an integer k, return the total number of contiguous subarrays whose sum equals k.",
      },
    ],
  },
  {
    label: "TRACK 02 · LINKED LISTS & POINTERS",
    sub: "where C students earn their -> arrows and everyone else learns what references really are",
    steps: [
      {
        title: "Reverse a linked list",
        q: "Given the head of a singly linked list (0 ≤ length ≤ 5000), reverse the list in place and return the new head. Aim for O(n) time and O(1) extra space.",
      },
      {
        title: "Middle of the linked list",
        q: "Given the head of a singly linked list (1 ≤ length ≤ 100), return the middle node. If there are two middle nodes, return the second one. Try to do it in a single pass.",
      },
      {
        title: "Detect a cycle",
        q: "Given the head of a singly linked list, determine whether the list contains a cycle. Aim for O(n) time and O(1) extra space (Floyd's tortoise and hare).",
      },
      {
        title: "Merge two sorted lists",
        q: "Given the heads of two sorted singly linked lists (each 0 ≤ length ≤ 50), merge them into one sorted list by splicing the existing nodes together, and return its head.",
      },
      {
        title: "Remove Nth node from the end",
        q: "Given the head of a singly linked list (1 ≤ length ≤ 30) and an integer n, remove the nth node from the end of the list and return the head. Try to do it in one pass with two pointers.",
      },
    ],
  },
  {
    label: "TRACK 03 · RECURSION → DYNAMIC PROGRAMMING",
    sub: "the jump from 'it recurses' to 'it memoizes' — where naive turns into optimal",
    steps: [
      {
        title: "Climbing stairs",
        q: "You are climbing a staircase with n steps (1 ≤ n ≤ 45). Each move you may climb 1 or 2 steps. In how many distinct ways can you reach the top? Show why the naive recursion is too slow and fix it.",
      },
      {
        title: "House robber",
        q: "Given an array of non-negative integers representing money in houses along a street (1 ≤ n ≤ 100), return the maximum amount you can rob without robbing two adjacent houses.",
      },
      {
        title: "Coin change",
        q: "Given coin denominations coins (1 ≤ coins.length ≤ 12) and an amount (0 ≤ amount ≤ 10^4), return the fewest coins needed to make up the amount, or -1 if impossible. You have unlimited coins of each denomination.",
      },
      {
        title: "Longest increasing subsequence",
        q: "Given an integer array nums (1 ≤ n ≤ 2500), return the length of the longest strictly increasing subsequence. Explain the O(n^2) DP first, then the O(n log n) improvement.",
      },
      {
        title: "0/1 knapsack",
        q: "Given n items (1 ≤ n ≤ 100) each with a weight and a value, and a knapsack of capacity W (1 ≤ W ≤ 1000), return the maximum total value you can carry. Each item can be taken at most once.",
      },
    ],
  },
];

export default function Roadmaps() {
  const { theme, toggleTheme } = useCzTheme();

  return (
    <div data-cz data-cz-theme={theme} className={`cz-root ${czFontClass}`}>
      <CzBackdrop />

      <div className="cz-content">
        <nav className="cz-nav">
          <div className="cz-nav-inner">
            <Link href="/" className="cz-brand">
              <span className="cz-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-beta">ROADMAPS</span>
            </Link>
            <div className="cz-nav-right">
              <Link href="/" className="cz-toggle">
                ← home
              </Link>
              <Link href="/solve" className="cz-toggle">
                solver →
              </Link>
              <button onClick={toggleTheme} aria-label="Toggle color mode" className="cz-toggle">
                {theme === "light" ? "◐" : "◑"} {theme}
              </button>
            </div>
          </div>
        </nav>

        <main className="czr-main">
          <div className="czr-head">
            <div className="cz-eyebrow">FIG. 05 — ROADMAPS</div>
            <h1 className="cz-h2">One topic at a time, in order.</h1>
            <p className="czr-lede">
              Three tracks, curated to the syllabus — each step opens the solver with the problem
              loaded, and your attempt still comes first. Do them in order; every step leans on the
              one before it.
            </p>
          </div>

          <div className="czr-tracks">
            {TRACKS.map((track) => (
              <div key={track.label} className="czr-track">
                <div className="czr-track-head">
                  <div className="czr-track-label">{track.label}</div>
                  <div className="czr-track-sub">{track.sub}</div>
                </div>
                {track.steps.map((step, i) => (
                  <Link
                    key={step.title}
                    href={`/solve?q=${encodeURIComponent(step.q)}`}
                    className="czr-step"
                  >
                    <span className="czr-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="czr-title">{step.title}</span>
                    <span className="czr-go">attempt →</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="czr-foot">
            dozens, not thousands — curated to the syllabus, on purpose. more tracks as the beta
            grows.
          </div>
        </main>
      </div>
    </div>
  );
}

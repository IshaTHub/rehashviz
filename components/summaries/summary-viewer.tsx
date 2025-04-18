'use client';
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card"
import { useState } from "react";

const parseSection = (section: string) => {
  const [title, ...content ] = section.split('\n');
  const cleanTitle = title.startsWith('#')
  ?title.substring(1).trim()
  : title.trim();

const points: String[] = [];

let currPoint = '';

for (const line of content) {
  const trimmedLine = line.trim();
  if (trimmedLine.startsWith('•')) {
    if (currPoint) {
      points.push(currPoint.trim());
    }
    currPoint = trimmedLine;
  } else if (!trimmedLine) {
    if(currPoint){
      points.push(currPoint.trim());
      currPoint = '';
    }
    else {
      currPoint += ` ${trimmedLine}`;
    }
  }
}
if (currPoint) {
  points.push(currPoint);
}

  return {title: cleanTitle, 
    points: points.filter((point) => point && !point.startsWith('#') && !point.startsWith('[Choose]'))};
}

export function SummaryViewer({ summary }: { summary: string }) {

  const [currentSection, setCurrentSection] =useState(0);
//parse summary

const sections = summary
.split('\n# ')
.map((section) => section.trim())
.filter(Boolean).map(parseSection);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {sections[currentSection].title}
        </CardTitle>
      </CardHeader>
      <CardContent>{JSON.stringify(sections[currentSection].points)}</CardContent>
    </Card>
  );
}
"use client";

import React, { useState } from "react";
import { EventsHero } from "@/components/media/events/EventsHero";
import { UpcomingEvents } from "@/components/media/events/UpcomingEvents";
import { PastEvents } from "@/components/media/events/PastEvents";
import { ExhibitionHighlights } from "@/components/media/events/ExhibitionHighlights";
import { EventPhotos } from "@/components/media/events/EventPhotos";
import { CorporateActivities } from "@/components/media/events/CorporateActivities";
import { EventAwards } from "@/components/media/events/EventAwards";
import { EventsCTA } from "@/components/media/events/EventsCTA";
import { EventDetailModal } from "@/components/media/events/EventDetailModal";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <EventsHero />
      <UpcomingEvents />
      <PastEvents onViewDetails={setSelectedEvent} />
      <ExhibitionHighlights />
      <EventPhotos />
      <CorporateActivities />
      <EventAwards />
      <EventsCTA />
      
      <EventDetailModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </main>
  );
}

import MeetupList from "../components/meetups/MeetupList";
import { useEffect, useState } from "react";

function AllMeetupsPage() {

  const [isLoading, setIsLoading] = useState(true)
  const [loadMeetups, setLoadMeetups] = useState([]) 

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://react-start-meetups-2e800-default-rtdb.firebaseio.com//meetups.json'
      ).then((res) => {
        return res.json();
      }).then((data) => {
        const meetups = []
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };
          meetups.push(meetup)
        }
        setIsLoading(false);
        setLoadMeetups(meetups);
      });
  }, [])
  
    if(isLoading){
      return (
        <section>
          <p>...Loading</p>
        </section>
      )
    }

    return (
      <section>
          <h1>All Meetups</h1>
              <MeetupList meetups={loadMeetups} />
      </section>
      );
}

export default AllMeetupsPage;
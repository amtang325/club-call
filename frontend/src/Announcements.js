import Announcement from './Announcement'

export default function Announcements({clubs}) {
    return (
        clubs.map(club => {
            return <Announcement key={club.time} club={club} />;
        })
    )
}
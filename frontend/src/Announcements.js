import Announcement from './Announcement'

export default function Announcements({announcements}) {
    return (
        announcements.map(announcement => {
            return <Announcement key={announcement.time} club={announcement} />;
        })
    )
}
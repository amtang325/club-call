import Club from './Club'

export default function ClubList({clubs}) {
    return (
        clubs.map(club => {
            return <Club key = {club.id} club = {club} />
        })
    )
}
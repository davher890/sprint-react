import jwt_decode from 'jwt-decode';

const session = {
    
    saveLastUrl: (url: string) => {
        sessionStorage.setItem('last_url', url || '');
    },

    saveToken: (headers: Headers) => {
        const token = headers.get('authorization') || ''

        let decoded: any = jwt_decode(token);
        sessionStorage.setItem('token', token || '');
        sessionStorage.setItem('is_admin', decoded.is_admin || '');
        sessionStorage.setItem('is_manager', decoded.is_manager || '');
        sessionStorage.setItem('user_id', decoded.user_id || 0)
        let sportSchools = (decoded.sport_school_ids || []).map(function(e: number, i: number) {
            return {id: e.toString(), name: decoded.sport_school_names[i]}
        });
        sessionStorage.setItem('sport_schools', JSON.stringify(sportSchools))
    }
}
export default session
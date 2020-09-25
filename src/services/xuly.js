export function chuyenLoaiQuanHe(num){
    switch(num){
    case 0:
        return 'Con trai';
    case 1:
        return 'Con gái';
    case 2:
        return 'Anh trai';
    case 3:
        return 'Chị gái';
        
    default:
        return ''
    }
}

export function chuyenGioiTinh(bool){
    if(bool === false) return 'Nam'
    if(bool === true) return 'Nữ'
}
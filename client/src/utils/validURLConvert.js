export const validURLConvert = (name)=>{
    if (!name) return '';
    return name.toString().toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
}
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, ActivityIndicator, Modal, CheckBox } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Svg, { Line } from 'react-native-svg'
import { getBenhNhanByBenhnhanId, getBacSiById, getCosoyteById, getKhoaById, getTinhById } from '../../services/fetchGET'
import { chuyenGioiTinh, chuyenLoaiQuanHe } from '../../services/xuly'
import { loaiKham } from '../../services/mockedData'

const Textsao = (props) => {
    return (
        <View style={props.style}>
            <Text>{props.children}<Text style={{ color: 'red' }} >*    </Text></Text>
        </View>
    )
}

const KhongCoThongTin = ({ children }) => {
    return ((children == null) ? <Text style={{ color: 'red' }}> Không có thông tin</Text> : <Text> {children} </Text>)
}

const KiemtrathongtinScreen = ({ route, navigation }) => {
    const [l1,setL1] = useState(false);
    const [l2,setL2] = useState(false);
    const [l3,setL3] = useState(false);
    const [l4,setL4] = useState(false);
    const [l5,setL5] = useState(false);
    const [data, setData] = useState();
    const [dataTinh, setDataTinh] = useState();
    const [dataCS, setDataCS] = useState();
    const [dataKhoa, setDataKhoa] = useState();
    const [dataBS, setDataBS] = useState();
    const [loading, setLoading] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const { benhnhanid } = route.params;
    const { loaiquanhe } = route.params;
    const { tinhid } = route.params;
    const { CSid } = route.params;
    const { khoaid } = route.params;
    const { BSid } = route.params;
    const { date } = route.params;
    const { noidungkham } = route.params;
    const { loaikhamid } = route.params;
    const currentDate = new Date();


    useEffect(() => {
        getBenhNhanByBenhnhanId(benhnhanid)
            .then((json) => setData(json))
            .finally(() => setL1(true));
        getTinhById(tinhid)
            .then((json) => setDataTinh(json))
            .finally(() => setL2(true));
        getCosoyteById(CSid)
            .then((json) => setDataCS(json))
            .finally(() => setL3(true));
        getKhoaById(khoaid)
            .then((json) => setDataKhoa(json))
            .finally(() => setL4(true));
        getBacSiById(BSid)
            .then((json) => setDataBS(json))
            .finally(() => setL5(true));

    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                {!(l1&l2&l3&l4&l5) ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.modalBox}>
                            <View style={styles.modal}>
                                <Text style={styles.modalText}> đang thực hiện</Text>
                                <ActivityIndicator color='white' />
                            </View>
                        </View>
                    </Modal>
                    :
                    <View>
                        <Text style={styles.headerText}>Vui lòng kiểm tra thông tin lịch khám</Text>
                        <View style={styles.inforBox}>
                            <Text style={{ fontWeight: "bold" }}>Thông tin cá nhân</Text>
                            <Svg height="35" width="500" >
                                <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                            </Svg>
                        </View>

                        <View style={styles.inforBox}>
                            <Textsao >Họ và tên</Textsao>
                            <Text>{data.ten}</Text>
                        </View>
                        <View style={styles.inforBox}>
                            <View style={styles.inforBox}>
                                <Textsao >Ngày sinh</Textsao>
                                <Text >{data.ngaysinh}</Text>
                            </View>
                            <View style={styles.inforBox}>
                                <Textsao>Giới tính</Textsao>
                                <Text> {chuyenGioiTinh(data.gioitinh)}</Text>
                            </View>
                        </View>
                        <View style={styles.inforBox}>
                            <Textsao >Số CMND/Hộ chiếu</Textsao>
                            <Text>{data.cmnd}</Text>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 1 }}>
                                <Text>Nơi cấp: <KhongCoThongTin>{data.noicap}</KhongCoThongTin></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ngày cấp: <KhongCoThongTin>{data.ngaycap}</KhongCoThongTin></Text>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Số thẻ BHYT:</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{data.bhyt}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Mối quan hệ : </Text >
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text> {chuyenLoaiQuanHe(loaiquanhe)} </Text>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <Text style={{ fontWeight: "bold" }}>Thông tin liên lạc</Text>
                            <Svg height="35" width="500" >
                                <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                            </Svg>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Địa chỉ:</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{data.diachi}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Số điện thoại liên hệ :</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin></KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <Text style={{ fontWeight: "bold" }}>Thông tin bác sĩ(dự kiến) </Text>
                            <Svg height="35" width="500" >
                                <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                            </Svg>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Tên bác sĩ </Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{dataBS.ten}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Khoa khám bệnh  </Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>Khoa {dataKhoa.ten}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Bệnh viện </Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{dataCS.ten}, {dataTinh.ten}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Chuyên môn </Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{dataBS.chuyenkhoa}</KhongCoThongTin>
                            </View>
                        </View>


                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Trình độ</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{dataBS.trinhdo}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Mô tả :</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin></KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <Text style={{ fontWeight: "bold" }}>Thông tin lịch khám</Text>
                            <Svg height="35" width="500" >
                                <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                            </Svg>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Thời gian đăng ký</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>
                                    {currentDate.getHours()}:{currentDate.getMinutes()}:{currentDate.getSeconds()}   {currentDate.getDate()}/{currentDate.getMonth() + 1}/{currentDate.getUTCFullYear()}
                                </KhongCoThongTin>
                            </View>
                        </View>

                        <View style={[styles.inforBox]}>
                            <View style={{ flex: 2 }}>
                                <Text>Ngày khám</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>Ngày {date.getDate()} Tháng {date.getMonth() + 1} Năm {date.getFullYear()}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={[styles.inforBox]}>
                            <View style={{ flex: 2 }}>
                                <Text>Giờ khám</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{date.getHours()} giờ {date.getMinutes()} phút</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Loại khám</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{loaiKham.find(item => (item.id == loaikhamid)).ten}</KhongCoThongTin>
                            </View>
                        </View>

                        <View style={styles.inforBox}>
                            <View style={{ flex: 2 }}>
                                <Text>Nội dung khám </Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <KhongCoThongTin>{noidungkham}</KhongCoThongTin>
                            </View>
                        </View>
                        <Svg height="20" width="500" >
                            <Line x1="0" y1="3" x2="1000" y2="3" stroke="gray" strokeWidth="1" />
                        </Svg>

                        <View style={{ marginBottom: 20 }} >
                            <Text
                                style={{ fontStyle: 'italic' }}
                            > *** Vui lòng kiểm tra kết nối internet để chất lượng buổi tư vấn không bị gián đoạn {'\n'}
                            Nếu có thay đổi lịch, thông báo sẽ gửi đến hộp thư của bạn. Vui lòng kiểm tra hộp thư thường xuyên</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                value={checkbox}
                                onValueChange={setCheckbox}
                            />
                            <Text > Xác nhận thông tin </Text>
                        </View>

                        <View style={styles.buttonBox}>
                            <TouchableOpacity
                                style={styles.button}
                                disabled={!checkbox}
                                onPress={() => {
                                    console.log(dataBS);
                                    console.log(dataCS);
                                    console.log(dataKhoa);
                                    console.log(dataTinh);
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    ĐẶT LỊCH
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        padding: 10
    },
    modalBox: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    modal: {
        height: 35,
        width: 200,
        padding: 10,
        backgroundColor: "#0183fd",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        color: 'white'
    },
    headerText: {
        color: '#0183fd',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 15
    },
    inforBox: {
        flex: 1,
        flexDirection: 'row',
        height: 35,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonBox: {
        alignSelf: 'stretch',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#3bccbb',
        borderRadius: 10,
        borderColor: '#3bccbb',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,

    }
})

export default KiemtrathongtinScreen;
//下拉选择框obj
function selectobj(sn, sv) {
  this.sn = sn
  this.sv = sv
}
//用于在select等控件，选中值改变是，修改相关元素的label说明及默认值
function DefaultVal(idstr, label, val) {
  this.idstr = idstr
  this.label = label
  this.val = val
}
var LogClass_s = new Array(
  new selectobj('请选择审计分类', '0'),
  new selectobj('系统日志', '1'),
  new selectobj('操作日志', '2')
)

var LogStatus_s = new Array(
  new selectobj('请选择审计结果', '0'),
  new selectobj('成功', '1'),
  new selectobj('失败', '2')
)

var TaskStation_s = new Array(
  new selectobj('已执行', '1'),
  new selectobj('正在执行', '2'),
  new selectobj('暂停', '3'),
  new selectobj('终止', '4'),
  new selectobj('未执行', '5'),
  new selectobj('超期', '6')
)
var SureState_s = new Array(new selectobj('已确认', '0'), new selectobj('未确认', '1'))

var RunPathType_s = new Array(
  new selectobj('全面巡检', '0'),
  new selectobj('特殊巡视', '1'),
  new selectobj('专项巡视', '2'),
  new selectobj('自定义巡视', '3'),
  new selectobj('熄灯巡视', '4'),
  new selectobj('例行巡检', '5'),
  new selectobj('静默任务', '6')
)

var SelRunPathType_s = new Array(
  // new selectobj('请选择巡检类型', '-1'),
  new selectobj('全面巡检', '0'),
  new selectobj('特殊巡视', '1'),
  new selectobj('专项巡视', '2'),
  new selectobj('自定义巡视', '3'),
  new selectobj('熄灯巡视', '4'),
  new selectobj('例行巡检', '5'),
  new selectobj('静默任务', '6')
)

//顺序不能更改，与param.php中对应
var AreaDevType_s = new Array(
  new selectobj('其他', '0'),
  new selectobj('主变压器', '1'),
  new selectobj('站用变', '2'),
  new selectobj('电压互感器', '3'),
  new selectobj('电流互感器', '4'),
  new selectobj('断路器', '5'),
  new selectobj('隔离开关', '6'),
  new selectobj('避雷器', '7'),
  new selectobj('阻波器', '8'),
  new selectobj('电容器', '9'),
  new selectobj('电抗器', '10'),
  new selectobj('绝缘子', '11'),
  new selectobj('油枕', '12'),
  new selectobj('跌落式保险', '13'),
  new selectobj('架空线', '14'),
  new selectobj('母线', '15'),
  new selectobj('绝缘支柱', '16'),
  new selectobj('构架', '17'),
  new selectobj('蓄电池', '18'),
  new selectobj('直流电源系统', '19'),
  new selectobj('消弧装置', '20'),
  new selectobj('开关柜', '21'),

  new selectobj('继保屏', '22'),
  new selectobj('油浸式所变', '23'),
  new selectobj('干式所变', '24'),
  new selectobj('所用电系统', '25'),
  new selectobj('红外对射', '26'),
  new selectobj('电子围栏', '27'),
  new selectobj('泡沫喷淋', '28'),
  new selectobj('配电柜', '29'),
  new selectobj('组合电器', '30'),
  new selectobj('并联电容器组', '31'),
  new selectobj('干式电抗器', '32'),
  new selectobj('串联补偿装置', '33'),
  new selectobj('穿墙套管', '34'),
  new selectobj('高压熔断器', '35'),
  new selectobj('中性点隔直(限直)装置', '36'),
  new selectobj('接地装置', '37'),
  new selectobj('端子箱及检修电源箱', '38'),
  new selectobj('站用交流电源系统', '39'),
  new selectobj('站用直流电源系统', '40'),
  new selectobj('设备构架', '41'),
  new selectobj('辅助设施', '42'),
  new selectobj('土建设施', '43'),
  new selectobj('独立避雷针', '44'),
  new selectobj('避雷器动作次数表', '45'),
  new selectobj('母线及绝缘子', '46')
)
var Station_s = new Array(
  new selectobj('主变电站', '0'),
  new selectobj('变压站1', '1'),
  new selectobj('变压站2', '2')
)
//顺序不能更改，与param.php中对应
var SelAreaDevType_s = new Array(
  //   new selectobj('其他', '0'),
  //   new selectobj('主变压器', '1'),
  //   new selectobj('站用变', '2'),
  //   new selectobj('电压互感器', '3'),
  //   new selectobj('电流互感器', '4'),
  //   new selectobj('断路器', '5'),
  //   new selectobj('隔离开关', '6'),
  //   new selectobj('避雷器', '7'),
  //   new selectobj('阻波器', '8'),
  //   new selectobj('电容器', '9'),
  //   new selectobj('电抗器', '10')

  new selectobj('室外轮式机器人', '1'),
  new selectobj('室内轮式机器人', '2'),
  new selectobj('挂轨机器人', '3'),
  new selectobj('高清视频', '10'),
  new selectobj('硬盘录像机', '11'),
  new selectobj('智能分析主机', '12'),
  new selectobj('无人机', '13'),
  new selectobj('声纹', '14'),
  new selectobj('巡视主机', '20')
)

var DevSelfType_s = new Array(
  //   new selectobj('其他', '0'),
  new selectobj('油位表', '1'),
  new selectobj('避雷器动作次数表', '2'),
  new selectobj('泄漏电流表', '3'),
  new selectobj('SF6压力表', '4'),
  new selectobj('液压表', '5'),
  new selectobj('油温表', '6'),
  new selectobj('开关动作次数表', '7'),
  new selectobj('档位表', '8'),
  new selectobj('气压表', '9')
)

var Area_s = new Array(
  new selectobj('220kv设备区', '0'),
  new selectobj('10kv设备区', '1'),
  new selectobj('110kv设备区', '2'),
  new selectobj('主变设备区', '3')
)

var AppearType_s = new Array(
  //   new selectobj('主变外观', '0'),
  //   new selectobj('组合电器外观', '1'),
  //   new selectobj('开关外观', '2')

  new selectobj('电子围栏', '1'),
  new selectobj('红外对射', '2'),
  new selectobj('泡沫喷淋', '3'),
  new selectobj('消防水泵', '4'),
  new selectobj('消防栓', '5'),
  new selectobj('消防室', '6'),

  new selectobj('设备室', '7'),
  new selectobj('照明灯', '8'),
  new selectobj('摄像头', '0'),
  new selectobj('水位线', '10'),
  new selectobj('排水泵', '11'),
  new selectobj('沉降监测点', '12')
)

var PointSourType_s = new Array(
  new selectobj('机器人', '0'),
  // new selectobj('视频', '1')
  new selectobj('摄像机', '2')
)

var DeviceDetialType_s = new Array(
  //   new selectobj('其他', '0'),
  //   new selectobj('指针仪表识别', '1'),
  //   new selectobj('数字仪表识别', '2'),
  //   new selectobj('液位仪表识别', '3'),
  //   new selectobj('吸湿器仪表识别', '4'),
  //   new selectobj('开关仪表识别', '5'),
  //   new selectobj('刀闸仪表识别', '6'),
  //   new selectobj('红外测温', '7')

  new selectobj('表计读取', '1'),
  new selectobj('位置状态识别', '2'),
  new selectobj('设备外观查看', '3'),
  new selectobj('红外测温', '4'),
  new selectobj('声音检测', '5'),
  new selectobj('闪烁检测', '6'),
  new selectobj('局放超声波检测', '11'),
  new selectobj('局放地电压检测', '12'),
  new selectobj('局放特高频检测', '13'),
  new selectobj('环境温度检测', '101'),
  new selectobj('环境湿度检测', '102'),
  new selectobj('氧气浓度检测', '103'),
  new selectobj('SF6浓度检测', '104')
)

var TaskSta_s = new Array(
  // new selectobj('全部任务', '0'),
  new selectobj('典型任务', '1'),
  new selectobj('临时任务', '2')
)
var TaskSta1_s = new Array(new selectobj('典型任务', '1'), new selectobj('临时任务', '2'))
var patrolSta_s = new Array(
  new selectobj('全部任务', '0'),
  new selectobj('典型任务', '1'),
  new selectobj('临时任务', '2')
)

var TaskMod_s = new Array(
  new selectobj('全面巡检', '0'),
  new selectobj('特殊巡视', '1'),
  new selectobj('专项巡视', '2'),
  new selectobj('自定义巡视', '3'),
  new selectobj('熄灯巡视', '4'),
  new selectobj('例行巡检', '5'),
  new selectobj('静默任务', '6')
)

var AllDeviceDetialType_s = new Array(
  new selectobj('其他', '0'),
  new selectobj('指针仪表识别', '1'),
  new selectobj('数字仪表识别', '2'),
  new selectobj('液位仪表识别', '3'),
  new selectobj('吸湿器仪表识别', '4'),
  new selectobj('开关仪表识别', '5'),
  new selectobj('刀闸仪表识别', '6'),
  new selectobj('红外测温', '7'),
  new selectobj('声音检测', '8'),
  new selectobj('视频录像', '9'),
  new selectobj('指针分合仪表', '10'),
  new selectobj('实物ID', '11'),
  new selectobj('地电波', '12'),
  new selectobj('超声波', '13'),
  new selectobj('SF6气体检测', '14'),
  new selectobj('噪声检测', '15'),
  new selectobj('特高频', '16'),
  new selectobj('射频', '17'),
  new selectobj('磁场', '18'),
  new selectobj('工频', '19'),
  new selectobj('紫外', '20'),
  new selectobj('WDS200温度', '21'),
  new selectobj('WDS200湿度', '22'),
  new selectobj('WDS200PM10传感器', '23'),
  new selectobj('WDS200PM25传感器', '24'),
  new selectobj('功率传感器', '25'),
  new selectobj('电压传感器', '26'),
  new selectobj('电流传感器', '27'),
  new selectobj('风速传感器', '28'),
  new selectobj('警灯', '29'),
  new selectobj('警号', '30'),
  new selectobj('JS-103声光报警器', '32'),
  new selectobj('EAP-300XT双鉴探测器', '33'),
  new selectobj('JA-5198A烟雾传感器', '34'),
  new selectobj('EM15-2浮球传感器', '35'),
  new selectobj('THT-200-NX-C4-D温度', '36'),
  new selectobj('THT-200-NX-C4-D湿度', '37'),
  new selectobj('APEG-T03-V臭氧传感器', '38'),
  new selectobj('YJH-KT100空调遥控模块', '39'),
  new selectobj('照明设备', '40'),
  new selectobj('风机设备', '41'),
  new selectobj('顺创- SF6设备', '42'),
  new selectobj('顺创-防盗设备', '43'),
  new selectobj('顺创-烟雾传感器', '44'),
  new selectobj('顺创-温度计', '45'),
  new selectobj('顺创-O3', '46'),
  new selectobj('顺创-空调', '47'),
  new selectobj('顺创-液位传感器', '48'),
  new selectobj('顺创-水泵', '49'),
  new selectobj('顺创-门禁', '50'),
  new selectobj('顺创-风机', '51'),
  new selectobj('顺创-湿度计', '52'),
  new selectobj('顺创-灯', '53'),
  new selectobj('顺创-电池容量', '54'),
  new selectobj('顺创-O2', '55'),
  new selectobj('D8X3设备开关信号输出', '56'),
  new selectobj('阻车钉(辅控)', '57'),
  new selectobj('大门(辅控)', '58'),
  new selectobj('人行门(辅控)', '59'),
  new selectobj('电子围栏(辅控)', '60'),
  new selectobj('闸机(辅控)', '61'),
  new selectobj('电子巡更(辅控)', '62')
)

var IdentifyType_s = new Array(
  new selectobj('普通指针表', 'Pointer'),
  new selectobj('指针开合表', 'PointerSwitch'),
  new selectobj('指针数字表', 'PointerDigital'),
  new selectobj('普通数字表', 'Digital'),
  new selectobj('液位表', 'Level'),
  new selectobj('吸湿器', 'Dehydrator'),
  new selectobj('普通开合表', 'Switches'),
  new selectobj('一般刀闸', 'Guillotine'),
  new selectobj('接地刀闸', 'GroundConnection'),
  new selectobj('颜色识别刀闸', 'ColorSwitches'),
  new selectobj('3D刀闸', '3DGuillotine'),
  new selectobj('刻度表', 'RuleMeter'),
  new selectobj('储能表', 'StoreEnergy'),
  new selectobj('指示灯', 'IndicatorLight'),
  new selectobj('视频识别闪烁指示灯', 'VideoDetectionLight'),
  new selectobj('指针字符表', 'PointerCharacter'),
  new selectobj('指针功率因数表', 'PointerPowerFactor'),
  new selectobj('裂纹检测', 'CrackDetect'),
  new selectobj('异物检测', 'ForeignMatterDetect'),
  new selectobj('形变检测', 'ShapeChangeDetect'),
  new selectobj('双指针指针表', 'DoublePointer'),
  new selectobj('双指针数字表', 'DoubleDigital'),
  new selectobj('人脸检测', 'PersonDetect'),
  new selectobj('车辆识别', 'CarRecognize'),
  new selectobj('行为分析检测', 'BehaviouralDetect'),
  new selectobj('二维码识别', 'QRCodeDetect'),
  new selectobj('电子围栏检测', 'EfenceDetect'),
  new selectobj('巡更结果检测', 'PatrolResDetect'),
  new selectobj('闸机检测', 'GateMachineDetect'),
  new selectobj('变电站异物检测(深度识别)', 'TSForeignMatterDetect'),
  new selectobj('行为分析检测(深度识别)', 'BehaviouralAnalysis'),
  new selectobj('火灾检测(深度识别)', 'FireDetect'),
  new selectobj('车辆检测(深度识别)', 'CarDetect'),
  new selectobj('人员检测(深度识别)', 'PeopleDetect'),
  new selectobj('人脸检测(深度识别)', 'FaceDetect'),
  new selectobj('安全帽检测(深度识别)', 'HelmetDetect'),
  new selectobj('综合异常检测(深度识别)', 'MultipleAnomalous'),
  new selectobj('表盘模糊(深度识别)', 'bj_bpmh'),
  new selectobj('表盘破损(深度识别)', 'bj_bpps'),
  new selectobj('外壳破损(深度识别)', 'bj_wkps'),
  new selectobj('绝缘子破裂(深度识别)', 'jyz_pl'),
  new selectobj('部件表面油污(深度识别)', 'sly_bjbmyw'),
  new selectobj('地面油污(深度识别)', 'sly_dmyw'),
  new selectobj('金属锈蚀(深度识别)', 'jsxs'),
  new selectobj('硅胶筒破损(深度识别)', 'hxq_gjtps'),
  new selectobj('箱门闭合异常(深度识别)', 'xmbhyc'),
  new selectobj('异物-高空悬浮物(深度识别)', 'yw_gkxfw'),
  new selectobj('异物-鸟巢(深度识别)', 'yw_nc'),
  new selectobj('门窗墙地面损坏(深度识别)', 'mcqdmsh'),
  new selectobj('盖板破损(深度识别)', 'gbps'),
  new selectobj('构架爬梯未上锁(深度识别)', 'gjptwss'),
  new selectobj('表面污秽(深度识别)', 'bmwh'),
  new selectobj('越线闯入(深度识别)', 'yxcr'),
  new selectobj('未穿安全帽(深度识别)', 'wcaqm'),
  new selectobj('未穿工装(深度识别)', 'wcgz'),
  new selectobj('吸烟(深度识别)', 'xy'),
  new selectobj('表计读数异常(深度识别)', 'bjdsyc'),
  new selectobj('油位状态油封异常(深度识别)', 'ywzt_yfyc'),
  new selectobj('硅胶变色(深度识别)', 'hxq_gjbs'),
  new selectobj('压板和(深度识别)', 'kgg_ybh'),
  new selectobj('压板分(深度识别)', 'kgg_ybf'),
  new selectobj('导体护套破损(深度识别)', 'dthtps'),
  new selectobj('引线断股或松股(深度识别)', 'yxdghsg'),
  new selectobj('未佩戴安全绳(深度识别)', 'wpdaqs'),
  new selectobj('人员倒地(深度识别)', 'rydd'),
  new selectobj('火灾烟雾(深度识别)', 'sndmjs'),
  new selectobj('室内地面积水(深度识别)', 'hzyw'),
  new selectobj('墙面漏水(深度识别)', 'qmls'),
  new selectobj('墙面漏水(深度识别)', 'qmls'),
  new selectobj('屋顶漏水（深度识别）', 'wdls'),
  new selectobj('小动物闯入（深度识别）', 'xdwcr'),
  new selectobj('油位指示计异常（深度识别）', 'ywzt_ywzsjyc'),
  new selectobj('呼吸器油封破损（深度识别）', 'hxq_yfps'),
  new selectobj('导线断股（深度识别）', 'dxdg'),
  new selectobj('套管胶合部油污（深度识别）', 'sly_jhbyw'),
  new selectobj('汇控柜凝露（深度识别）', 'hkgnl'),
  new selectobj('膨胀器冲顶（深度识别）', 'pzqcd'),
  new selectobj('电容器鼓肚（深度识别）', 'drqgd'),
  new selectobj('人脸识别（深度识别）', 'FaceRec'),
  new selectobj('17类缺陷识别（深度识别）', 'Detect17Type'),
  new selectobj('人员倒地', 'PersonConversely'),
  new selectobj('剧烈运动', 'StrenuousExercise'),
  new selectobj('穿越警戒面', 'CrossWarning'),
  new selectobj('区域入侵', 'AreaInvade'),
  new selectobj('进入区域', 'AccessArea'),
  new selectobj('离开区域', 'LeaveArea'),
  new selectobj('徘徊', 'Wander'),
  new selectobj('人员聚集', 'PersonGather'),
  new selectobj('奔跑', 'Run'),
  new selectobj('作业后现场遗留识别', 'LeaveOver'),
  new selectobj('安全帽检测', 'IPChelmetDetect'),
  new selectobj('场地烟火', 'cdyh'),
  new selectobj('积水', 'js'),
  new selectobj('小动物', 'xdw'),
  new selectobj('异物入侵', 'ywrq'),
  new selectobj('设备烟火', 'sbyh'),
  new selectobj('渗漏油', 'sly'),
  new selectobj('设备变形', 'sbbx'),
  new selectobj('设备断裂', 'sbdl'),
  new selectobj('设备倾斜', 'sbqx')
)

var shortIdentifyType_s = new Array(
  new selectobj('人员倒地', 'PersonConversely'),
  new selectobj('剧烈运动', 'StrenuousExercise'),
  new selectobj('穿越警戒面', 'CrossWarning'),
  new selectobj('区域入侵', 'AreaInvade'),
  new selectobj('进入区域', 'AccessArea'),
  new selectobj('离开区域', 'LeaveArea'),
  new selectobj('徘徊', 'Wander'),
  new selectobj('人员聚集', 'PersonGather'),
  new selectobj('奔跑', 'Run'),
  new selectobj('作业后现场遗留识别', 'LeaveOver'),
  new selectobj('安全帽检测', 'IPChelmetDetect'),
  new selectobj('未穿工装 ', 'wcgz')
)

var SelDeviceType_s = new Array(
  new selectobj('仪表识别类设备', '1'),
  new selectobj('红外测温类设备', '2'),
  new selectobj('声音检测类设备', '3'),
  new selectobj('视频录像类设备', '4'),
  new selectobj('可见光图片类', '5'),
  new selectobj('实物ID检测', '6'),
  new selectobj('局放类设备', '7'),
  new selectobj('SF6气体检测', '8'),
  new selectobj('噪声检测', '9'),
  new selectobj('目标检测', '10'),
  new selectobj('紫外', '11'),
  new selectobj('3D刀闸', '12'),
  new selectobj('TD8843IM红外检测', '13'),
  new selectobj('温湿度检测类设备', '14'),
  new selectobj('人脸识别', '15'),
  new selectobj('行为分析检测', '16'),
  new selectobj('开关量输入设备', '17'),
  new selectobj('输出设备', '18'),
  new selectobj('车辆识别', '19'),
  new selectobj('电子围栏检测', '20'),
  new selectobj('巡更结果检测', '21'),
  new selectobj('闸机检测', '100')
)

var Mulriple_s = new Array(new selectobj('1倍', '0'), new selectobj('10倍', '1'))

var RFIDAutoInspect_s = new Array(new selectobj('否', 0), new selectobj('是', 1))

var MeterIdentifyMode_s = new Array(
  new selectobj('准确度优先', '0'),
  new selectobj('速度优先', '1')
)

var DeviceType_s = new Array(
  new selectobj('请选择设备类型', ''),
  new selectobj('仪表识别类设备', '1'),
  new selectobj('红外测温类设备', '2'),
  new selectobj('声音检测类设备', '3'),
  new selectobj('视频录像类设备', '4'),
  new selectobj('可见光图片类', '5'),
  new selectobj('实物ID检测', '6'),
  new selectobj('局放类设备', '7'),
  new selectobj('SF6气体检测', '8'),
  new selectobj('噪声检测', '9'),
  new selectobj('目标检测', '10'),
  new selectobj('紫外', '11'),
  new selectobj('3D刀闸', '12'),
  new selectobj('TD8843IM红外检测', '13'),
  new selectobj('温湿度检测类设备', '14'),
  new selectobj('人脸识别', '15'),
  new selectobj('行为分析检测', '16'),
  new selectobj('开关量输入设备', '17'),
  new selectobj('输出设备', '18'),
  new selectobj('车辆识别', '19')
)

var DevicePhaseType_s = new Array(
  new selectobj('0相', '0'),
  new selectobj('A相', '1'),
  new selectobj('B相', '2'),
  new selectobj('C相', '3'),
  new selectobj('AA相', '4'),
  new selectobj('AB相', '5'),
  new selectobj('AC相', '6'),
  new selectobj('BB相', '7'),
  new selectobj('BC相', '8'),
  new selectobj('CC相', '9')
)

//修改这个，要同时修改param.php中的相应内容
var Result_Unit_s = new Array(
  new selectobj('无', ' '),
  new selectobj('mA', 'mA'),
  new selectobj('%', '%'),
  new selectobj('V', 'V'),
  new selectobj('kV', 'kV'),
  new selectobj('A', 'A'),
  new selectobj('℃', '℃'),
  new selectobj('MPa', 'MPa'),
  new selectobj('次', '次'),
  new selectobj('档', '档')
)

var VolLevel_s = new Array(
  new selectobj('750kV', '0'),
  new selectobj('500kV', '1'),
  new selectobj('330kV', '2'),
  new selectobj('220kV', '3'),
  new selectobj('110kV', '4'),
  new selectobj('35kV', '5'),
  new selectobj('10kV', '6'),
  new selectobj('400V', '7'),
  new selectobj('66kV', '8')
)

var DevSideFlag_s = new Array(
  new selectobj('A面', '0'),
  new selectobj('B面', '1'),
  new selectobj('C面', '2'),
  new selectobj('D面', '3')
)

var Task_Finish_IFR_s = new Array(new selectobj('不关闭', '0'), new selectobj('关闭', '1'))

var Task_Finish_Motion_s = new Array(new selectobj('回去充电', '1'), new selectobj('原地待命', '2'))

var Task_FocusFlag_s = new Array(
  new selectobj('按设定值', '0'),
  new selectobj('全部不聚焦', '1'),
  new selectobj('首次聚焦', '2')
)

var FocusFlag_s = new Array(
  new selectobj('不聚焦', '0'),
  new selectobj('自动聚焦', '1'),
  new selectobj('预置位聚焦', '2')
)
var Task_CaliFlag_s = new Array(new selectobj('按设定值', '0'), new selectobj('全部不调零', '1'))

var CaliFlag_s = new Array(new selectobj('调零', '0'), new selectobj('不调零', '1'))
var Task_ShelterFlag_s = new Array(
  new selectobj('按设定值', '0'),
  new selectobj('全部不关闭挡片', '1')
)
var ShelterFlag_s = new Array(new selectobj('关闭', '0'), new selectobj('不关闭挡片', '1'))

var Task_PICFlag_s = new Array(
  new selectobj('正常巡检', '0'),
  new selectobj('红外设备只拍可见光图片', '1')
)

var Task_Finish_Flag_s = new Array(new selectobj('正常结束', '0'), new selectobj('异常结束', '1'))

var Task_Rule_s = new Array(
  new selectobj('不重复', '0'),
  new selectobj('每天', '1'),
  new selectobj('每周', '2'),
  new selectobj('每月', '3'),
  new selectobj('重复执行', '4')
)

var Robot_Rule_s = new Array(
  new selectobj('不重复', '0'),
  new selectobj('每天', '1'),
  new selectobj('每周', '2'),
  new selectobj('每月', '3')
)

var Day_s = new Array(
  new selectobj('1', '1'),
  new selectobj('2', '2'),
  new selectobj('3', '3'),
  new selectobj('4', '4'),
  new selectobj('5', '5'),
  new selectobj('6', '6'),
  new selectobj('7', '7'),
  new selectobj('8', '8'),
  new selectobj('9', '9'),
  new selectobj('10', '10'),
  new selectobj('11', '11'),
  new selectobj('12', '12'),
  new selectobj('13', '13'),
  new selectobj('14', '14'),
  new selectobj('15', '15'),
  new selectobj('16', '16'),
  new selectobj('17', '17'),
  new selectobj('18', '18'),
  new selectobj('19', '19'),
  new selectobj('20', '20'),
  new selectobj('21', '21'),
  new selectobj('22', '22'),
  new selectobj('23', '23'),
  new selectobj('24', '24'),
  new selectobj('25', '25'),
  new selectobj('26', '26'),
  new selectobj('27', '27'),
  new selectobj('28', '28'),
  new selectobj('29', '29'),
  new selectobj('30', '30'),
  new selectobj('31', '31')
)

var Week_s = new Array(
  new selectobj('请选择具体星期', '-1'),

  new selectobj('星期一', '1'),
  new selectobj('星期二', '2'),
  new selectobj('星期三', '3'),
  new selectobj('星期四', '4'),
  new selectobj('星期五', '5'),
  new selectobj('星期六', '6'),
  new selectobj('星期日', '7')
)

var CarSpeed_s = new Array(
  new selectobj('0.1米/秒', '100'),
  new selectobj('0.2米/秒', '200'),
  new selectobj('0.3米/秒', '300'),
  new selectobj('0.4米/秒', '400'),
  new selectobj('0.5米/秒', '500'),
  new selectobj('0.6米/秒', '600'),
  new selectobj('0.7米/秒', '700'),
  new selectobj('0.8米/秒', '800'),
  new selectobj('0.9米/秒', '900'),
  new selectobj('1米/秒', '1000')
)

var CarSpeed1_s = new Array(
  new selectobj('1档', '1'),
  new selectobj('2档', '2'),
  new selectobj('3档', '3'),
  new selectobj('4档', '4'),
  new selectobj('5档', '5')
)

var CloseIFREnable_s = new Array(new selectobj('不生效', '0'), new selectobj('生效', '1'))
var dissideflag_s = new Array(new selectobj('不显示', '0'), new selectobj('显示', '1'))

//1:FY 2:WD 3:YA
var PTZType_s = new Array(
  new selectobj('维多', '2'),
  new selectobj('亚安', '3'),
  new selectobj('飞越', '1')
)

var MapFlag_s = new Array(new selectobj('主地图', '0'), new selectobj('子地图', '1'))

var WeatherStation_s = new Array(
  new selectobj('六要素气象站', '0'),
  new selectobj('华控-HS-QXZ气象站', '1')
)

var BatteryPer_s = new Array(
  new selectobj('5%', '5'),
  new selectobj('10%', '10'),
  new selectobj('15%', '15'),
  new selectobj('20%', '20'),
  new selectobj('25%', '25'),
  new selectobj('30%', '30'),
  new selectobj('35%', '35'),
  new selectobj('40%', '40'),
  new selectobj('45%', '45'),
  new selectobj('50%', '50'),
  new selectobj('55%', '55'),
  new selectobj('60%', '60'),
  new selectobj('65%', '65'),
  new selectobj('70%', '70'),
  new selectobj('75%', '75'),
  new selectobj('80%', '80'),
  new selectobj('85%', '85'),
  new selectobj('90%', '90'),
  new selectobj('95%', '95')
)

var InspectType_s = new Array(
  new selectobj('普通巡检点', '0'),
  new selectobj('充电准备点', '1'),
  new selectobj('充电点', '2'),
  new selectobj('地图切换点', '3')
)

var InspectionYawType_s = new Array(
  new selectobj('同边的方向', '0'),
  new selectobj('与边反向', '1')
)

var EdgeLaserFlag_s = new Array(new selectobj('不忽略', '0'), new selectobj('忽略', '1'))

var Edgeonovic_s = new Array(new selectobj('单向', '0'), new selectobj('双向', '1'))

var FallFlag_s = new Array(new selectobj('启用', '0'), new selectobj('不启用', '1'))

var User_Level_s = new Array(
  new selectobj('请选择用户类型', ''),
  new selectobj('系统管理员', '1'),
  new selectobj('审计管理员', '2'),
  new selectobj('业务操作员', '3'),
  new selectobj('安全策略员', '4'),
  // new selectobj("管理员","5"),
  // new selectobj("操作员","6"),
  // new selectobj("访问用户","7"),
  new selectobj('门卫监控', '8')
)

var Puer_User_Level_s = new Array(
  new selectobj('请选择用户类型', ''),
  new selectobj('系统管理员', '1'),
  new selectobj('管理员', '5'),
  new selectobj('操作员', '6'),
  new selectobj('访问用户', '7'),
  new selectobj('门卫监控', '8')
)

var MapChangeType_s = new Array(new selectobj('单点切换', '0'), new selectobj('多点切换', '1'))

var CheckPTZFlag_s = new Array(new selectobj('自检', '0'), new selectobj('不自检', '1'))

var UseDefaultValue_s = new Array(new selectobj('优化', '0'), new selectobj('不优化', '1'))

var DisDefaultVaule_s = new Array(new selectobj('不显示', '0'), new selectobj('显示', '1'))

var AutoSearchMeter_s = new Array(new selectobj('不搜索', '0'), new selectobj('自动搜索', '1'))

var AutoCorrectPreset_s = new Array(new selectobj('不修正', '0'), new selectobj('自动修正', '1'))

var DisOSDFlag_s = new Array(new selectobj('不显示', '0'), new selectobj('显示', '1'))

var DisWrapFlag_s = new Array(new selectobj('不显示', '0'), new selectobj('显示', '1'))

//是否记录可见光找表时的匹配度，用于再次找表判断，是否找到表
var RecordIdentBestScoreFlag_s = new Array(new selectobj('不记录', '0'), new selectobj('记录', '1'))

var AutoRebootServerFlag_s = new Array(new selectobj('不启用', '0'), new selectobj('启用', '1'))

var Hour_s = new Array(
  new selectobj('0', '00'),
  new selectobj('1', '01'),
  new selectobj('2', '02'),
  new selectobj('3', '03'),
  new selectobj('4', '04'),
  new selectobj('5', '05'),
  new selectobj('6', '06'),
  new selectobj('7', '07'),
  new selectobj('8', '08'),
  new selectobj('9', '09'),
  new selectobj('10', '10'),
  new selectobj('11', '11'),
  new selectobj('12', '12'),
  new selectobj('13', '13'),
  new selectobj('14', '14'),
  new selectobj('15', '15'),
  new selectobj('16', '16'),
  new selectobj('17', '17'),
  new selectobj('18', '18'),
  new selectobj('19', '19'),
  new selectobj('20', '20'),
  new selectobj('21', '21'),
  new selectobj('22', '22'),
  new selectobj('23', '23')
)

var Minute_s = new Array(
  new selectobj('0', '00'),
  new selectobj('1', '01'),
  new selectobj('2', '02'),
  new selectobj('3', '03'),
  new selectobj('4', '04'),
  new selectobj('5', '05'),
  new selectobj('6', '06'),
  new selectobj('7', '07'),
  new selectobj('8', '08'),
  new selectobj('9', '09'),
  new selectobj('10', '10'),
  new selectobj('11', '11'),
  new selectobj('12', '12'),
  new selectobj('13', '13'),
  new selectobj('14', '14'),
  new selectobj('15', '15'),
  new selectobj('16', '16'),
  new selectobj('17', '17'),
  new selectobj('18', '18'),
  new selectobj('19', '19'),
  new selectobj('20', '20'),
  new selectobj('21', '21'),
  new selectobj('22', '22'),
  new selectobj('23', '23'),
  new selectobj('24', '24'),
  new selectobj('25', '25'),
  new selectobj('26', '26'),
  new selectobj('27', '27'),
  new selectobj('28', '28'),
  new selectobj('29', '29'),
  new selectobj('30', '30'),
  new selectobj('31', '31'),
  new selectobj('32', '32'),
  new selectobj('33', '33'),
  new selectobj('34', '34'),
  new selectobj('35', '35'),
  new selectobj('36', '36'),
  new selectobj('37', '37'),
  new selectobj('38', '38'),
  new selectobj('39', '39'),
  new selectobj('40', '40'),
  new selectobj('41', '41'),
  new selectobj('42', '42'),
  new selectobj('43', '43'),
  new selectobj('44', '44'),
  new selectobj('45', '45'),
  new selectobj('46', '46'),
  new selectobj('47', '47'),
  new selectobj('48', '48'),
  new selectobj('49', '49'),
  new selectobj('50', '50'),
  new selectobj('51', '51'),
  new selectobj('52', '52'),
  new selectobj('53', '53'),
  new selectobj('54', '54'),
  new selectobj('55', '55'),
  new selectobj('56', '56'),
  new selectobj('57', '57'),
  new selectobj('58', '58'),
  new selectobj('59', '59')
)

var YesOrNo_s = new Array(new selectobj('否', '0'), new selectobj('是', '1'))

var AlwaysUseDefaultValue_s = new Array(new selectobj('不使用', '0'), new selectobj('使用', '1'))

//20220420修改，0和1都改为正常，以前0表示红外正常，1表示可见光正常
//这里修改的话，要同时修改param.php中相应的变量
var AlarmTypeInfo_s = new Array(
  new selectobj('正常', '0'),
  new selectobj('正常', '1'),
  new selectobj('可见光异常', '2'),
  new selectobj('绝对温差报警', '111'),
  //new selectobj("绝对值报警","112"),
  new selectobj('绝对值报警', '113'),
  new selectobj('相间温差报警', '121'),
  //new selectobj("相间温差报警","122"),
  //new selectobj("相间温差报警","123"),
  new selectobj('温度报警', '122'),
  new selectobj('湿度报警', '123'),
  new selectobj('PM2.5报警', '124'),
  new selectobj('PM10报警', '125'),
  new selectobj('气压报警', '126'),
  new selectobj('高温报警', '127'),
  new selectobj('高低温报警', '128'),
  new selectobj('人脸未识别报警', '129'),
  new selectobj('巡视结果趋势异常报警', '130'),
  new selectobj('5次结果不变报警', '131'),
  new selectobj('车牌未识别报警', '132'),
  new selectobj('车牌未录入报警', '133'),
  new selectobj('非同源结果差报警', '134'),
  new selectobj('开关量报警', '135'),
  new selectobj('开关量报警恢复', '136'),
  new selectobj('短路报警', '137'),
  new selectobj('短路报警恢复', '138'),
  new selectobj('断路报警', '139'),
  new selectobj('断路报警恢复', '140'),
  new selectobj('触网报警', '141'),
  new selectobj('触网报警恢复', '142'),
  new selectobj('重点人员识别报警', '143'),
  new selectobj('相对温差报警', '231'),
  new selectobj('识别失败', '211'),
  //new selectobj("识别失败-绝对值报警","212"),
  //new selectobj("识别失败-绝对值报警","213"),
  //new selectobj("识别失败-相间温差报警","221"),
  //new selectobj("识别失败-相间温差报警","222"),
  //new selectobj("识别失败-相间温差报警","222"),
  new selectobj('阀基监视系统报警', '311'),
  new selectobj('智能识别报警', '411'),
  new selectobj('风险评估高报警', '511'),
  new selectobj('异物遮挡', '3')
)

var HardDiskVaule_s = new Array(
  new selectobj('30%', '30'),
  new selectobj('60%', '60'),
  new selectobj('90%', '90')
)

var CpuVaule_s = new Array(
  new selectobj('30%', '30'),
  new selectobj('60%', '60'),
  new selectobj('90%', '90')
)

var MemoryVaule_s = new Array(
  new selectobj('30%', '30'),
  new selectobj('60%', '60'),
  new selectobj('90%', '90')
)

var AlarmInfo_s = new Array(
  new selectobj('请选择告警类型', '0'),
  new selectobj('正常', '1'),
  new selectobj('告警', '2')
)
var RuleDesc_s = new Array(
  new selectobj('请选择任务类型', '0'),
  new selectobj('非路线巡检', '1'),
  new selectobj('其他', '2')
)

var UserAlarmInfo_s = new Array(
  new selectobj('请选择告警类型', '0'),
  new selectobj('正常', '1'),
  new selectobj('严重告警', '2'),
  new selectobj('一般告警', '3')
)

var AlarmType_s = new Array(new selectobj('正常', '0'), new selectobj('异常', '1'))

var FaceType_s = new Array(
  new selectobj('请选择识别结果', '0'),
  new selectobj('陌生人', '1'),
  new selectobj('全部', '2'),
  new selectobj('分组', '3'),
  new selectobj('个人', '4')
)

var NotMatchDefaultValue_s = new Array(
  new selectobj('全部', '0'),
  new selectobj('与默认值不符的', '1')
)
//var InspectResultOrderBy_s=new Array(
//new selectobj("时间由近到远","0"),
//new selectobj("时间由远到近","1"),
//new selectobj("结果由大到小","2"),
//new selectobj("结果由小到大","3")
//);

var InspectResultOrderBy_s = new Array(
  new selectobj('时间由近到远', '0'),
  new selectobj('时间由远到近', '1')
)

var PosiNegaTive_s = new Array(
  new selectobj('正样本', 'positive'),
  new selectobj('负样本', 'negative')
)

var Bug_Level_s = new Array(
  new selectobj('请选择告警级别', '0'),
  new selectobj('一般缺陷', '1'),
  new selectobj('严重缺陷', '2'),

  new selectobj('危急缺陷', '3')
)

var IfrObjType_s = new Array(new selectobj('设备位置', '1'), new selectobj('辅助点', '2'))

var OperateAction_s = new Array(
  new selectobj('框选仪表', '1'),
  new selectobj('标定刻度', '2'),
  new selectobj('标定指针', '3'),
  new selectobj('框选样本', '4'),
  new selectobj('框选液位', '5'),
  new selectobj('标定液面', '6'),
  new selectobj('标定数字区域', '7'),
  new selectobj('框选每个数字', '8')
)
//指针表
var OperateAction1_s = new Array(
  new selectobj('框选仪表', '1'),
  new selectobj('标定刻度', '2'),
  new selectobj('标定指针', '3'),
  new selectobj('标定圆心', '9')
)
//液位
var OperateAction5_s = new Array(
  new selectobj('框选仪表', '1'),
  new selectobj('框选液位', '5'),
  new selectobj('标定液面', '6')
)
//开关刀闸
var OperateAction4_s = new Array(new selectobj('框选仪表', '1'), new selectobj('框选样本', '4'))
//数字表
var OperateAction7_s = new Array(
  new selectobj('框选仪表', '1'),
  new selectobj('标定数字区域', '7'),
  new selectobj('框选每个数字', '8')
)

var OperateAction8_s = new Array(
  new selectobj('框选仪表', '1'),
  new selectobj('标定刻度区域', '7'),
  new selectobj('标定刻度', '2'),
  new selectobj('框选滑块', '5')
)

//这里修改的话，要同时修改param.php中相应的变量
var SideFlag_s = new Array('A面', 'B面', 'C面', 'D面')

//这里修改的话，要同时修改param.php中相应的变量
var DevPhaseType_s = new Array(
  '0相',
  'A相',
  'B相',
  'C相',
  'AA相',
  'AB相',
  'AC相',
  'BB相',
  'BC相',
  'CC相'
)

var BugLevel_s = new Array('正常', '一般缺陷', '严重缺陷', '危急缺陷')

var BugLevelOP_s = new Array(
  new selectobj('正常', '0'),
  new selectobj('一般缺陷', '1'),
  new selectobj('严重缺陷', '2'),
  new selectobj('危急缺陷', '3')
)

var IdentificationType_s = new Array(new selectobj('识别正确', '0'), new selectobj('识别错误', '1'))

//控件选择
var ActiveX_s = new Array(new selectobj('使用OCX', '1'), new selectobj('使用VLC', '0'))

//被测设备模板中，设备的类型，目前暂时只分红外和可见光
var DevTemplateType_s = new Array(new selectobj('可见光', '0'), new selectobj('红外', '1'))

//红外设备框选的类型
var IfrDrawType_s = new Array(new selectobj('矩形', '0'), new selectobj('多边形', '1'))

var DisabledFlag_s = new Array(new selectobj('可以巡检', '0'), new selectobj('暂时无法巡检', '1'))

var ModelCreateFlag_s = new Array(new selectobj('已建模', '0'), new selectobj('未建模', '1'))

var OnceInspectTime_s = new Array(
  new selectobj('1小时', '1'),
  new selectobj('2小时', '2'),
  new selectobj('3小时', '3'),
  new selectobj('4小时', '4'),
  new selectobj('5小时', '5'),
  new selectobj('6小时', '6'),
  new selectobj('7小时', '7'),
  new selectobj('8小时', '8'),
  new selectobj('9小时', '9'),
  new selectobj('10小时', '10')
)

var manufacturer_s = new Array(
  new selectobj('浙江大立', '1'),
  new selectobj('南瑞继远', '2'),
  new selectobj('杭州申昊', '3'),
  new selectobj('国网智能', '4'),
  new selectobj('国网信息通信', '5'),
  new selectobj('浙江国自', '6'),
  new selectobj('许继', '7'),
  new selectobj('浙江华云', '8')
)
var RobotModel_s = new Array(
  new selectobj('DL-RC63-V1.3', '1'),
  new selectobj('DL-RC63-V1.31', '2'),
  new selectobj('DL-RC63-V1.32', '3'),
  new selectobj('DL-RC63-V1.32S', '15'),
  new selectobj('DL-RC63-V1.33', '21'),
  new selectobj('DL-RC63-V1.41', '4'),
  new selectobj('DL-RC63-V1.41B', '8'),
  new selectobj('DL-RC63-V1.5', '5'),
  new selectobj('DL-RC63-V1.51', '6'),
  new selectobj('DL-RC63-V2.2', '7'),
  new selectobj('DL-RC63-V1.61(原1.6)', '9'),
  new selectobj('DL-RC63-V1.41F', '10'),
  new selectobj('DL-RC63-V1.41B1', '22'),
  new selectobj('DL-RC63-V1.7', '11'),
  new selectobj('DL-RC63-V1.42M', '24'),
  new selectobj('DL-RC63-V3.0', '20'),
  new selectobj('DL-RC63-HW1.0', '23'),
  new selectobj('DL-RC63-JS3.0', '29'),
  new selectobj('DL-RC63-GJS3.0', '30'),
  new selectobj('DL-RC63-V3.1', '31'),
  new selectobj('DL-RC63-JB3.0', '14'),
  new selectobj('DL-RC63-T1.33', '28'),
  new selectobj('DL-RC63-GJB3.0', '34'),
  new selectobj('DL-RC63-GJT3.0', '35'),
  new selectobj('DL-RC63-HWCS', '37'),
  new selectobj('DL-RC63-J-1.41F', '40'),
  new selectobj('DL-RC63-AJB4.0', '43'),
  new selectobj('DL-RC63-AJS4.0', '45'),
  new selectobj('DL-RC63-JB4.1', '46'),
  new selectobj('DL-RC63-JS4.1', '47'),
  new selectobj('DL-RC63-V1.41B2', '48'),
  new selectobj('DL-RC63-V1.33B', '49'),
  new selectobj('DL-RC63-TR1.33', '50'),
  new selectobj('DL-RC63-TR1.41', '51'),
  new selectobj('DL-RC63-JB3.1', '52'),
  new selectobj('DL-RC63-T3.2', '55'),
  new selectobj('DL-RC63-GB3.0', '56'),
  new selectobj('DL-RC63-GS3.0', '57'),
  new selectobj('DL-RD63-V1.0', '58'),
  new selectobj('DL-RC63-ZB3.0', '59'),
  new selectobj('DL-RC63-V4.2.0(四驱差速)', '60'),
  new selectobj('DL-RC63-V4.2.1(四驱带转向)', '61'),
  new selectobj('DL-RC63-Z1.33', '63'),
  new selectobj('DL-RC63-B1.42M', '64'),
  new selectobj('DL-RC63-B3.2', '65'),
  new selectobj('DL-RC63-D3.2', '66'),
  new selectobj('DL-RT63B-V1.0', '12'),
  new selectobj('DL-RT63B-V1.1', '13'),
  new selectobj('DL-RT63B-J1.0', '18'),
  new selectobj('DL-RT63B-J1.1', '16'),
  new selectobj('DL-RT63BP-L1.0', '17'),
  new selectobj('DL-RT63BP-J1.0', '19'),
  new selectobj('DL-RT63BP-JQ1.0', '25'),
  new selectobj('DL-RT63D-L1.0', '26'),
  new selectobj('DL-RT63B-JQ2.0', '27'),
  new selectobj('DL-RT63BP-V1.0', '36'),
  new selectobj('DL-RT63D-V1.0', '38'),
  new selectobj('DL-RT63D-J1.0', '39'),
  new selectobj('DL-RT63BP-V1.1', '41'),
  new selectobj('DL-RT63BP-J1.1', '42'),
  new selectobj('DL-RT63BP-J1.2', '44'),
  new selectobj('DL-RT63BP-V1.2', '53'),
  new selectobj('DL-RT63BP-V1.0-SF6', '54'),
  new selectobj('DL-RU63-V1.0(磁编码定位)', '62'),
  new selectobj('DL-RT63D-J1.0-A', '67')
)

var CarType_s = new Array(
  new selectobj('轮式机器人', '0'),
  new selectobj('导轨机器人', '1'),
  new selectobj('固定式机器人', '2'),
  new selectobj('体温筛查系统', '3'),
  new selectobj('智能分析主机', '12'),
  new selectobj('无人机', '13'),
  new selectobj('无人机机巢', '15'),
  new selectobj('区域巡视主机', '20'),
  new selectobj('边缘节点', '21')
)

var Company_s = new Array(
  new selectobj('国家电网', '0'),
  new selectobj('南方电网', '1'),
  new selectobj('地方电网', '2'),
  new selectobj('铁路电网', '4'),
  new selectobj('特制1', '3'),
  new selectobj('特制2', '5'),
  new selectobj('云南普洱换流站', '6'),
  new selectobj('从西换流站', '7'),
  new selectobj('测试界面', '8'),
  new selectobj('安全测试', '9')
)

var Stype_s = new Array(new selectobj('蓝色风格', '0'), new selectobj('绿色风格', '1'))

var CMSType_s = new Array(new selectobj('机器人系统', '0'), new selectobj('疾控体温监控系统', '1'))

var CommunicateProtocol_s = new Array(
  new selectobj('国网', '0'),
  new selectobj('大立', '1'),
  new selectobj('物联网', '2')
)

var Online_s = new Array(
  new selectobj('全部', '0'),
  new selectobj('在线', '1'),
  new selectobj('离线', '2')
)

var AbnormalType_s = new Array(new selectobj('无法识别', '0'), new selectobj('识别异常', '1'))

var DeviceTypeSel_s = new Array(new selectobj('所有点位', '0'), new selectobj('RFID点位', '1'))

var timeSoft_s = new Array(new selectobj('按时间降序', 'DESC'), new selectobj('按时间升序', 'ASC'))

var CameraType_s = new Array(
  new selectobj('摄像机（只有红外）', '0'),
  new selectobj('摄像机（只有可见光）', '1'),
  new selectobj('摄像机（红外加可见光）', '2'),
  new selectobj('C2000-A1-SDD1010-AB3(小)', '3'),
  new selectobj('海康DVR', '4'),
  new selectobj('四要素气象站', '5'),
  new selectobj('环控柜', '7'),
  new selectobj('海康人脸识别服务器', '8'),
  new selectobj('巡更服务器', '9'),
  new selectobj('报警主机(HY-6106C)', '10'),
  new selectobj('C2000-A2-KDDB080-AD4(大)', '11'),
  new selectobj('电子围栏G5S226', '12'),
  new selectobj('声纹', '14'),
  new selectobj('行为分析服务器', '15'),
  new selectobj('大华DH-NVR4216-4KS2/L', '16'),
  new selectobj('海康存储服务器', '17'),
  new selectobj('海康DS-8632N-K8', '18'),
  new selectobj('海康DS-2DE4223IW-DE', '19'),
  new selectobj('大华DH-NVR6013DW-XN', '50'),
  new selectobj('大华DH-NVR608-64-4KS2', '51'),
  new selectobj('宇视NVR-S200-R16@64', '100'),
  new selectobj('宇视DLM-P64N8', '101'),
  new selectobj('大华NVR(DLM-N-V64D16)', '52')
)

var IFRVideoFrom_s = new Array(new selectobj('红外摄像机', '0'), new selectobj('DVR', '1'))

var IPCVideoFrom_s = new Array(new selectobj('可见光摄像机', '0'), new selectobj('DVR', '1'))

var IPCStoreFrom_s = new Array(new selectobj('不存储', '0'), new selectobj('DVR', '1'))

var LogOut_s = new Array(
  new selectobj('1分钟', '1'),
  new selectobj('2分钟', '2'),
  new selectobj('3分钟', '3'),
  new selectobj('4分钟', '4'),
  new selectobj('5分钟', '5'),
  new selectobj('6分钟', '6'),
  new selectobj('7分钟', '7'),
  new selectobj('8分钟', '8'),
  new selectobj('9分钟', '9'),
  new selectobj('10分钟', '10'),
  new selectobj('11分钟', '11'),
  new selectobj('12分钟', '12'),
  new selectobj('13分钟', '13'),
  new selectobj('14分钟', '14'),
  new selectobj('15分钟', '15'),
  new selectobj('16分钟', '16'),
  new selectobj('17分钟', '17'),
  new selectobj('18分钟', '18'),
  new selectobj('19分钟', '19'),
  new selectobj('20分钟', '20'),
  new selectobj('21分钟', '21'),
  new selectobj('22分钟', '22'),
  new selectobj('23分钟', '23'),
  new selectobj('24分钟', '24'),
  new selectobj('25分钟', '25'),
  new selectobj('26分钟', '26'),
  new selectobj('27分钟', '27'),
  new selectobj('28分钟', '28'),
  new selectobj('29分钟', '29'),
  new selectobj('30分钟', '30')
)

var passTime_s = new Array(
  new selectobj('1天', '1'),
  new selectobj('2天', '2'),
  new selectobj('3天', '3'),
  new selectobj('4天', '4'),
  new selectobj('5天', '5'),
  new selectobj('6天', '6'),
  new selectobj('7天', '7'),
  new selectobj('15天', '15'),
  new selectobj('30天', '30'),
  new selectobj('60天', '60'),
  new selectobj('90天', '90')
)

var ErrorRetries_s = new Array(
  new selectobj('1次', '1'),
  new selectobj('2次', '2'),
  new selectobj('3次', '3'),
  new selectobj('4次', '4'),
  new selectobj('5次', '5'),
  new selectobj('6次', '6'),
  new selectobj('7次', '7'),
  new selectobj('8次', '8'),
  new selectobj('9次', '9'),
  new selectobj('10次', '10')
)

var ErrorCoolDown_s = new Array(
  new selectobj('20分钟', '20'),
  new selectobj('25分钟', '25'),
  new selectobj('30分钟', '30')
)

var EveryIPSecurityRule_s = new Array(new selectobj('允许', '0'), new selectobj('禁止', '1'))

var DVRSubType_s = new Array(new selectobj('C2000', '0'), new selectobj('DVR', '1'))

var extDevType_s = new Array(
  new selectobj('网络温湿度设备', '0'),
  new selectobj('开关量输入设备', '1')
)

var SafeType_s = new Array(new selectobj('安全模式', '1'), new selectobj('普通模式', '2'))

var VideoLink_s = new Array(
  new selectobj('无', '0'),
  new selectobj('阀机视频联动（厦门）', '1'),
  new selectobj('阀机视频联动（国网）', '2')
)

var DisplayModel_s = new Array(new selectobj('国网模式', '0'), new selectobj('超高压模式', '1'))

var Storage_s = new Array(new selectobj('NVR', '0'), new selectobj('存储服务器', '1'))

var FullViewChannel_s = new Array(
  new selectobj('低位摄像机', '0'),
  new selectobj('通道1', '1'),
  new selectobj('通道2', '2')
)

var AutoOpenVideo_s = new Array(new selectobj('不打开', '0'), new selectobj('打开', '1'))

function confirmparam(flag, rember) {
  this.flag = flag
  this.rember = rember
}

var InspectWorkType_s = new Array(
  new selectobj('普通巡检', '0'),
  new selectobj('静默巡检', '1'),
  new selectobj('无结果巡检', '2')
)

var PTZSpeed_s = new Array(
  new selectobj('速度1', '1'),
  new selectobj('速度2', '2'),
  new selectobj('速度3', '3')
)

var IPCDVRType_s = new Array(
  new selectobj('海康DVR/行为分析服务器', '0'),
  new selectobj('大华DH-NVR4216-4KS2/L', '1'),
  new selectobj('海康存储服务器', '2'),
  new selectobj('海康DS-8632N-K8', '3'),
  new selectobj('大华DH-NVR6013DW-XN', '50'),
  new selectobj('大华DH-NVR608-64-4KS2', '51'),
  new selectobj('宇视NVR-S200-R16@64', '100'),
  new selectobj('宇视DLM-P64N8', '101')
)

var ControlModel_s = new Array(
  new selectobj('任务模式', '1'),
  new selectobj('紧急定位模式', '2'),
  new selectobj('后台遥控模式', '3'),
  new selectobj('手持遥控模式', '4')
)
var UAVBack_s = new Array(new selectobj('启动一键返航', '1'), new selectobj('取消一键返航', '2'))
var UAVDown_s = new Array(new selectobj('启动自动降落', '1'), new selectobj('取消自动降落', '2'))

var UAVEle_s = new Array(
  new selectobj('唤醒无人机电源', '1'),
  new selectobj('关闭无人机电源', '2'),
  new selectobj('无人机休眠', '2')
)
var UAVStop_s = new Array(
  new selectobj('无人机急停开启', '1'),
  new selectobj('无人机急停解除', '2')
)
var UAVPic_s = new Array(
  new selectobj('仅可见光(传图)', '1'),
  new selectobj('仅红外(传图)', '2'),
  new selectobj('双视融合模式(传图)', '2')
)
var UAVHome_s = new Array(
  new selectobj('机巢开启', '1'),
  new selectobj('机巢关闭', '2'),
  new selectobj('机巢重置', '2')
)
var UAVHomeStop_s = new Array(
  new selectobj('机巢急停开启', '1'),
  new selectobj('机巢急停解除', '2')
)
var UAVHomeDoor_s = new Array(
  new selectobj('机巢舱门开启', '1'),
  new selectobj('机巢舱门关闭', '2'),
  new selectobj('机巢舱门重置', '2')
)
var PtzSpeed_s = new Array(
  new selectobj('速度1', '1'),
  new selectobj('速度2', '2'),
  new selectobj('速度3', '3'),
  new selectobj('速度4', '4'),
  new selectobj('速度5', '5'),
  new selectobj('速度6', '6'),
  new selectobj('速度7', '7')
)

var ReportContent_s = new Array(
  new selectobj('实物ID', 'RFID'),
  new selectobj('方向', 'AreaDevType'),
  new selectobj('相别', 'SideFlag'),
  new selectobj('识别类型', 'DeviceType'),
  new selectobj('告警等级', 'AlarmLevel'),
  new selectobj('缺陷类别', 'AlarmType'),
  new selectobj('点位状态', 'Statue'),
  new selectobj('图片', 'Picture')
)

var Year_s = new Array(
  new selectobj('1990', '1990'),
  new selectobj('1991', '1991'),
  new selectobj('1992', '1992'),
  new selectobj('1993', '1993'),
  new selectobj('1994', '1994'),
  new selectobj('1995', '1995'),
  new selectobj('1996', '1996'),
  new selectobj('1997', '1997'),
  new selectobj('1998', '1998'),
  new selectobj('1999', '1999'),
  new selectobj('2000', '2000'),
  new selectobj('2001', '2001'),
  new selectobj('2002', '2002'),
  new selectobj('2003', '2003'),
  new selectobj('2004', '2004'),
  new selectobj('2005', '2005'),
  new selectobj('2006', '2006'),
  new selectobj('2007', '2007'),
  new selectobj('2008', '2008'),
  new selectobj('2009', '2009'),
  new selectobj('2010', '2010'),
  new selectobj('2011', '2011'),
  new selectobj('2012', '2012'),
  new selectobj('2013', '2013'),
  new selectobj('2014', '2014'),
  new selectobj('2015', '2015'),
  new selectobj('2016', '2016'),
  new selectobj('2017', '2017'),
  new selectobj('2018', '2018'),
  new selectobj('2019', '2019'),
  new selectobj('2020', '2020'),
  new selectobj('2021', '2021'),
  new selectobj('2022', '2022'),
  new selectobj('2023', '2023'),
  new selectobj('2024', '2024'),
  new selectobj('2025', '2025'),
  new selectobj('2026', '2026'),
  new selectobj('2027', '2027'),
  new selectobj('2028', '2028'),
  new selectobj('2029', '2029'),
  new selectobj('2030', '2030')
)

var WorkWay_s = new Array(
  new selectobj('定期执行', '1'),
  new selectobj('周期执行', '2'),
  new selectobj('间隔执行(小时)', '3'),
  new selectobj('间隔执行(天)', '4')
)

var hourRule_s = new Array(new selectobj('间隔执行(小时)', '3'), new selectobj('间隔执行(天)', '4'))

var Priority_s = new Array(
  new selectobj('优先级1', '1'),
  new selectobj('优先级2', '2'),
  new selectobj('优先级3', '3')
)
var DeviceLevel_s = new Array(
  new selectobj('间隔', '1'),
  new selectobj('主设备', '2'),
  new selectobj('设备点位', '3'),
  new selectobj('部件', '4')
)

var Month_s = new Array(
  new selectobj('请选择月份', '-1'),
  new selectobj('1月', '1'),
  new selectobj('2月', '2'),
  new selectobj('3月', '3'),
  new selectobj('4月', '4'),
  new selectobj('5月', '5'),
  new selectobj('6月', '6'),
  new selectobj('7月', '7'),
  new selectobj('8月', '8'),
  new selectobj('9月', '9'),
  new selectobj('10月', '10'),
  new selectobj('11月', '11'),
  new selectobj('12月', '12')
)
var Years_s = new Array(
  new selectobj('2011', '2011'),
  new selectobj('2012', '2012'),
  new selectobj('2013', '2013'),
  new selectobj('2014', '2014'),
  new selectobj('2015', '2015'),
  new selectobj('2016', '2016'),
  new selectobj('2017', '2017'),
  new selectobj('2018', '2018'),
  new selectobj('2019', '2019'),
  new selectobj('2020', '2020'),
  new selectobj('2021', '2021'),
  new selectobj('2022', '2022'),
  new selectobj('2023', '2023'),
  new selectobj('2024', '2024'),
  new selectobj('2025', '2025'),
  new selectobj('2026', '2026'),
  new selectobj('2027', '2027'),
  new selectobj('2028', '2028'),
  new selectobj('2029', '2029'),
  new selectobj('2030', '2030')
)

var MaintainType_s = new Array(
  new selectobj('缺陷记录', '0'),
  new selectobj('大修记录', '1'),
  new selectobj('退出记录', '2'),
  new selectobj('再投运记录', '3')
)

var CommunicateType_s = new Array(new selectobj('TCP', '0'), new selectobj('UDP', '1'))

//////////////////////////////////////////////////////////// select switch
/*
index值是被选中项的索引值，而不是其value值
对应不同的select 索引被选中及取消选中时，需要隐藏或显示哪些信息。
_index：中的内容为 select相应索引被选中时，需要显示的内容
_index_:中的内容为 select相应索引被选中时，需要隐藏的内容
_indexD:中的内容是select相应索引被选中时，其说明文字及默认值按照该设置刷新
//使用本功能时，必须要有元素对应的<div id="str_l"></div>元素
*/

//设备的默认参数更改时，要同时更改netdevsearch.php中AutoAddDev函数中相应的内容
var Task_Rule_relate = {
  //-1
  _0_: new Array('RuleWeek', 'RuleMonth', 'RepeatInterval'),

  //
  _1_: new Array('RuleWeek', 'RuleMonth', 'RepeatInterval'),

  //
  _2: new Array('RuleWeek'),
  _2_: new Array('RuleMonth', 'RepeatInterval'),

  //
  _3: new Array('RuleMonth'),
  _3_: new Array('RuleWeek', 'RepeatInterval'),

  _4: new Array('RepeatInterval'),
  _4_: new Array('RuleWeek', 'RuleMonth'),
}

var InspectType_relate = {
  //-1
  _0_: new Array('SwitchMapID'),

  //
  _1_: new Array('SwitchMapID'),

  _2_: new Array('SwitchMapID'),

  //
  _3: new Array('SwitchMapID'),
}

//////////////////////////////////////////////////////////////在该数组中的元素，对应的Note（包括其子节点或所有属性），整体作为页面上对应元素的值
//这里的CP对应到XML中即是<CP></CP>这个节点

var NotesForEle = new Array('CP')

var RobotType_s = new Array(
  '轮式机器人',
  '导轨机器人',
  '固定式机器人',
  '体温筛查系统',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '智能分析主机',
  '无人机',
  '',
  '无人机机巢',
  '',
  '',
  '',
  '',
  '区域巡视主机',
  '边缘节点'
)

var Manufacture_s = new Array(
  '',
  '浙江大立',
  '南瑞继远',
  '杭州申昊',
  '国网智能',
  '国网信息通信',
  '浙江国自',
  '许继',
  '浙江华云'
)

var manufacturer_s = new Array(
  new selectobj('浙江大立', '1'),
  new selectobj('南瑞继远', '2'),
  new selectobj('杭州申昊', '3'),
  new selectobj('国网智能', '4'),
  new selectobj('国网信息通信', '5'),
  new selectobj('浙江国自', '6'),
  new selectobj('许继', '7'),
  new selectobj('浙江华云', '8')
)

var DevManufacture_s = new Array('', '浙江大立', '海康', '大华', '同为')

var DevManufacturer_s = new Array(
  new selectobj('浙江大立', '1'),
  new selectobj('海康', '2'),
  new selectobj('大华', '3'),
  new selectobj('同为', '4'),
  new selectobj('宇视', '5')
)

var IFRCameraType_s = new Array(
  'DM63',
  'DM10',
  'DM66',
  '国自(640X512)',
  '朗驰(696X480)',
  '朗驰(320X240)',
  '鲁能(360X180)',
  '鲁能(280X180)',
  'D843',
  'D883',
  'DM60',
  'TD8843IM',
  '国网通用',
  'D843NT-M-D25',
  'DM20',
  'D883J',
  'D843J',
  'D883N',
  'D843N',
  'VD641NT'
)

var IPCCameraType_s = new Array(
  new selectobj('海康定制3007ipc', '0'),
  new selectobj('海康定制2007ipc', '1'),
  new selectobj('海康定制2008ipc', '2'),
  new selectobj('海康老标准2007ipc', '3'),
  new selectobj('海康老标准3007ipc', '4'),
  new selectobj('海康新标准2007ipc', '5'),
  new selectobj('海康新标准3007ipc', '6'),
  new selectobj('辉视相机', '7'),
  new selectobj('TD8843IM(同为球机)', '8'),
  new selectobj('海康新标准2507', '9'),
  new selectobj('DS-2DE7520IW-A', '10'),
  new selectobj('DS-2DC6220IW-A', '11'),
  new selectobj('DS-2ZMN0407(D)', '12'),
  new selectobj('海康DS-2PT7T20IW-DE', '13'),
  new selectobj('海康DS-2DY3423IW-D', '14'),
  new selectobj('海康球机iDS-2DE7423MW-AB', '15'),
  new selectobj('一体化摄像机DS-2DY5230IW-A', '16'),
  new selectobj('TD8843IM(同为摄像机)', '17'),
  new selectobj('大华DH-CA-HZ2030UC', '18'),
  new selectobj('大华 DH-SD-6A9432-HNR-ZB-E', '19'),
  new selectobj('全景iDS-2VPF14-A440-DV/SP/T2', '20'),
  new selectobj('海康iDS-2PT9A144MHS-D', '21'),
  new selectobj('海康DS-2CD6222FWD-L/DB', '22'),
  new selectobj('海康DS-TCG205-E', '23'),
  new selectobj('海康DS-2CD2725EFDV3', '24'),
  new selectobj('海康DS-2DE7220IW-A', '25'),
  new selectobj('大华DH-SD-6A302DW-HN', '100'),
  new selectobj('大华DH-SD-6A420DW-HNX', '101'),
  new selectobj('大华DH-SD-6A9230UE-HNI', '102'),
  new selectobj('宇视DLM-P30Q4', '150'),
  new selectobj('宇视DLM-P12D4-2', '151'),
  new selectobj('宇视HIC9821-IR', '152'),
  new selectobj('大华DLM-Q-4S40', '103'),
  new selectobj('大华DLM-BQ-4S33', '104'),
  new selectobj('大华DLM-T-4S30', '105')
)

var IPCCamera_s = new Array(
  '海康定制3007ipc',
  '海康定制2007ipc',
  '海康定制2008ipc',
  '海康老标准2007ipc',
  '海康老标准3007ipc',
  '海康新标准2007ipc',
  '海康新标准3007ipc',
  '辉视相机',
  'TD8843IM(同为球机)',
  '海康新标准2507',
  'DS-2DE7520IW-A',
  'DS-2DC6220IW-A',
  'DS-2ZMN0407(D)',
  'DS-2PT7T20IW-DE',
  'DS-2DY3423IW-D',
  'iDS-2DE7423MW-AB',
  'DS-2DY5230IW-A',
  'TD8843IM(同为摄像机)',
  'DH-CA-HZ2030UC',
  'DH-SD-6A9432-HNR-ZB-E',
  'iDS-2VPF14-A440-DV/SP/T2',
  'iDS-2PT9A144MHS-D',
  'DS-2CD6222FWD-L/DB',
  'DS-TCG205-E',
  'DS-2CD2725EFDV3',
  'DS-2DE7220IW-A'
)

var Offline_s = new Array('不在线', '在线')

var typeList_s = new Array(
  new selectobj('状态识别', '1'),
  new selectobj('缺陷识别', '2'),
  new selectobj('缺陷判别', '3')
)

var typeList_s1 = new Array(
  new selectobj('刀闸状态', 'isolator'),
  new selectobj('开关/压板状态', 'switch'),
  new selectobj('仪表读数', 'meter'),
  new selectobj('红外温度', 'infrared'),
  new selectobj('声音', 'sound'),
  new selectobj('指示灯、闪烁灯', 'light'),
  new selectobj('实物 ID', 'qrcode')
)

var typeList_s2 = new Array(
  new selectobj('表计表盘模糊', 'bj_bpmh'),
  new selectobj('表计表盘破损', 'bj_bpps'),
  new selectobj('表计外壳破损', 'bj_wkps'),
  new selectobj('绝缘子破裂', 'jyz_pl'),
  new selectobj('部件表面油污', 'sly_bjbmyw'),
  new selectobj('地面油污', 'sly_dmyw'),
  new selectobj('金属锈蚀 ', 'jsxs'),
  new selectobj('硅胶筒破损', 'hxq_gjtps'),
  new selectobj('箱门闭合异常 ', 'xmbhyc'),
  new selectobj('异物-高空悬浮物 ', 'yw_gkxfw'),
  new selectobj('异物-鸟巢 ', 'yw_nc'),
  new selectobj('门窗墙地面损坏 ', 'mcqdmsh'),
  new selectobj('盖板破损或缺失 ', 'gbps'),
  new selectobj('构架爬梯未上锁 ', 'gjptwss'),
  new selectobj('表面污秽 ', 'bmwh'),
  new selectobj('越线闯入 ', 'yxcr'),
  new selectobj('未穿安全帽 ', 'wcaqm'),
  new selectobj('未穿工装 ', 'wcgz'),
  new selectobj('吸烟 ', 'xy'),
  new selectobj('表计读数异常 ', 'bjdsyc'),
  new selectobj('油位状态油封异常 ', 'ywzt_yfyc'),
  new selectobj('呼吸器硅胶变色 ', 'hxq_gjbs'),
  new selectobj('压板合', 'kgg_ybh'),
  new selectobj('压板分 ', 'kgg_ybf'),
  new selectobj('导体护套破损 ', 'dthtps'),
  new selectobj('引线断股或松股 ', 'yxdghsg'),
  new selectobj('未佩戴安全绳 ', 'wpdaqs'),
  new selectobj('人员倒地 ', 'rydd'),
  new selectobj('火灾烟雾 ', 'hzyw'),
  new selectobj('室内地面积水 ', 'sndmjs'),
  new selectobj('墙面漏水 ', 'qmls'),
  new selectobj('屋顶漏水 ', 'wdls'),
  new selectobj('小动物闯入 ', 'xdwcr'),
  new selectobj('油位指示计异常 ', 'ywzt_ywzsjyc'),
  new selectobj('呼吸器油封破损 ', 'hxq_yfps'),
  new selectobj('导线断股 ', 'dxdg'),
  new selectobj('套管胶合部油污 ', 'sly_jhbyw'),
  new selectobj('汇控柜凝露 ', 'hkgnl'),
  new selectobj('膨胀器冲顶 ', 'pzqcd'),
  new selectobj('电容器鼓肚 ', 'drqgd')
)

var typeList_s3 = new Array(
  new selectobj('缺陷判别', 'tx_pb'),
  new selectobj('预置位偏移', 'tx_yzwpy')
)

var ImportantLevel_s = new Array(
  new selectobj('I类', '0'),
  new selectobj('II类', '1'),
  new selectobj('III类', '2')
)

var PTType_s = new Array(
  new selectobj('主站', '0'),
  new selectobj('三维平台', '1'),
  new selectobj('物联网平台', '2')
)

var UserTreeLevel_s = new Array(new selectobj('根群组', '0'), new selectobj('1级群组', '1'))

var Famale_s = new Array(new selectobj('男', '0'), new selectobj('女', '1'))

var Certificate_s = new Array(new selectobj('身份证', '0'))

var TransProtocol_s = new Array(new selectobj('TCP', '0'), new selectobj('UDP', '1'))

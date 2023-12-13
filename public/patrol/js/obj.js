function StationAreaTemplateObj(AreaTID, StationAreaDesc) {
  this.AreaTID = AreaTID
  this.StationAreaDesc = StationAreaDesc
}
function StationSpaceTemplateObj(SpaceTID, AreaSpaceDesc) {
  this.SpaceTID = SpaceTID
  this.AreaSpaceDesc = AreaSpaceDesc
}
function FirstDevNameTemplateObj(FirstDevTID, FirstDevDesc, FirstDevType) {
  this.FirstDevTID = FirstDevTID
  this.FirstDevDesc = FirstDevDesc
  this.FirstDevType = FirstDevType
}

function DevNameTemplateObj(
  DevNameTID,
  DevDesc,
  FirstDevTID,
  DevType,
  DevNormalLow,
  DevNormalHigh,
  alarm1,
  alarm2,
  alarm3,
  Relativealarm1,
  Relativealarm2,
  Relativealarm3,
  CompareAlarm
) {
  this.DevNameTID = DevNameTID
  this.DevDesc = DevDesc
  this.FirstDevTID = FirstDevTID
  this.DevType = DevType
  this.DevNormalLow = DevNormalLow
  this.DevNormalHigh = DevNormalHigh
  this.alarm1 = alarm1
  this.alarm2 = alarm2
  this.alarm3 = alarm3
  this.Relativealarm1 = Relativealarm1
  this.Relativealarm2 = Relativealarm2
  this.Relativealarm3 = Relativealarm3
  this.CompareAlarm = CompareAlarm
}

function MapDevObj(
  Device_Id,
  Device_Desc,
  Inspection_Id,
  Preset_Id,
  DevNameTID,
  DeviceType,
  DevDescT,
  PTZ_H,
  PTZ_V,
  IPC_F,
  IPC_Z,
  IPC_F_B,
  IPC_Z_B,
  IFR_F,
  Focus_Flag,
  Preset_Flag
) {
  this.Device_Id = Device_Id
  this.Device_Desc = Device_Desc
  this.Inspection_Id = Inspection_Id
  this.Preset_Id = Preset_Id
  this.DevNameTID = DevNameTID
  this.DeviceType = DeviceType
  this.DevDescT = DevDescT
  this.PTZ_H = PTZ_H
  this.PTZ_V = PTZ_V
  this.IPC_F = IPC_F
  this.IPC_Z = IPC_Z
  this.IPC_F_B = IPC_F_B
  this.IPC_Z_B = IPC_Z_B
  this.IFR_F = IFR_F
  this.Focus_Flag = Focus_Flag
  this.Preset_Flag = Preset_Flag
}

//Device_Desc:里面包含了相位，方向
//RealDevDesc:是设备本身的名字
//WrapType：红外设备的边框类型，0是矩形，2是多边形
function DevObj(
  Device_Id,
  Device_Desc,
  Area_Id,
  Inspection_Id,
  Device_Pri,
  DeviceType,
  DeviceDetialType,
  Result_Unit,
  Normal_Low,
  Normal_High,
  Bug_Desc,
  Deal_Method,
  Alarm_Flag,
  Preset_Id,
  AreaDevType,
  DevSelfType,
  DevNameTID,
  FirstDevID,
  VolLevel,
  SideFlag,
  DevDescT,
  FirstDevType,
  AlarmTemp1,
  AlarmTemp2,
  AlarmTemp3,
  AlarmXianDuiCha1,
  AlarmXianDuiCha2,
  AlarmXianDuiCha3,
  XianJianWenCha,
  DefaultValue,
  Rec_Time,
  DisabledFlag,
  WrapType,
  RealDevDesc,
  BestScore,
  AlwaysUseDefaultValue,
  DeviceID,
  CompDeviceID,
  SpaceID,
  CarID,
  fajiID,
  DisplayOrNot,
  DevSimDesc,
  RFID,
  IdentifyType,
  RFIDAutoInspect,
  ExportDiffValue,
  Mulriple,
  MeterIdentifyMode,
  ComDevID,
  ComName,
  DevIDGrid,
  OneKeyCtrl,
  ImportantLevel,
  GatewayID,
  DevieIDOnRobot
) {
  this.Device_Id = Device_Id
  this.Device_Desc = Device_Desc
  this.Area_Id = Area_Id
  this.Inspection_Id = Inspection_Id
  this.Device_Pri = Device_Pri
  this.DeviceType = DeviceType
  this.DeviceDetialType = DeviceDetialType
  this.Result_Unit = Result_Unit
  this.Normal_Low = Normal_Low
  this.Normal_High = Normal_High
  this.Bug_Desc = Bug_Desc
  this.Deal_Method = Deal_Method
  this.Alarm_Flag = Alarm_Flag
  this.Preset_Id = Preset_Id
  this.AreaDevType = AreaDevType
  this.DevSelfType = DevSelfType
  this.DevNameTID = DevNameTID
  this.FirstDevID = FirstDevID
  this.VolLevel = VolLevel
  this.SideFlag = SideFlag
  this.DevDescT = DevDescT
  this.FirstDevType = FirstDevType
  this.AlarmTemp1 = AlarmTemp1
  this.AlarmTemp2 = AlarmTemp2
  this.AlarmTemp3 = AlarmTemp3
  this.AlarmXianDuiCha1 = AlarmXianDuiCha1
  this.AlarmXianDuiCha2 = AlarmXianDuiCha2
  this.AlarmXianDuiCha3 = AlarmXianDuiCha3
  this.XianJianWenCha = XianJianWenCha
  this.DefaultValue = DefaultValue
  this.Rec_Time = Rec_Time
  this.DisabledFlag = DisabledFlag
  this.WrapType = WrapType
  this.RealDevDesc = RealDevDesc
  this.BestScore = BestScore
  this.AlwaysUseDefaultValue = AlwaysUseDefaultValue
  this.DeviceID = DeviceID
  this.CompDeviceID = CompDeviceID
  this.SpaceID = SpaceID
  this.CarID = CarID
  this.fajiID = fajiID
  this.DisplayOrNot = DisplayOrNot
  this.DevSimDesc = DevSimDesc
  this.RFID = RFID
  this.IdentifyType = IdentifyType
  this.RFIDAutoInspect = RFIDAutoInspect
  this.ExportDiffValue = ExportDiffValue
  this.Mulriple = Mulriple
  this.MeterIdentifyMode = MeterIdentifyMode
  this.ComDevID = ComDevID
  this.ComName = ComName
  this.DevIDGrid = DevIDGrid
  this.OneKeyCtrl = OneKeyCtrl
  this.ImportantLevel = ImportantLevel
  this.GatewayID = GatewayID
  this.DevieIDOnRobot = DevieIDOnRobot
}

//红外设备的设备对象
//DeviceID对应红外数据库中的设备ID
//Device_Id对应机器人数据库中的设备ID
//DeviceName红外数据库中红外设备的名称
function IfrDevObj(DeviceID, Device_Id, DeviceName, RLeft, RTop, RRight, RBottom) {
  this.DeviceID = DeviceID
  this.Device_Id = Device_Id
  this.DeviceName = DeviceName
  this.RLeft = RLeft
  this.RTop = RTop
  this.RRight = RRight
  this.RBottom = RBottom
}

//由Area Space FirstDev 组成的最终区域信息
function FinalAreaObj(Area_Id, Area_Desc, Parent_Id, TreeLevel, AreaType) {
  this.Area_Id = Area_Id
  this.Area_Desc = Area_Desc
  this.Parent_Id = Parent_Id
  this.TreeLevel = TreeLevel
  this.AreaType = AreaType
}

function MenuObj(
  MenuID,
  MenuDesc,
  MenuFlag,
  MenuType,
  MenuLevel,
  ParentMenuID,
  MenuUrl,
  MenuIco,
  YunNanMenuIconId
) {
  this.MenuID = MenuID
  this.MenuDesc = MenuDesc
  this.MenuFlag = MenuFlag
  this.MenuType = MenuType
  this.MenuLevel = MenuLevel
  this.ParentMenuID = ParentMenuID
  this.MenuUrl = MenuUrl
  this.MenuIco = MenuIco
  this.YunNanMenuIconId = YunNanMenuIconId
}

function DevAreaObj(HintID, HintType, HintDesc, ASFID, HintPos, isSelected) {
  this.HintID = HintID
  this.HintType = HintType
  this.HintDesc = HintDesc
  this.ASFID = ASFID
  this.HintPos = HintPos
  this.isSelected = isSelected
}

function AreaObj(Area_Id, Area_Desc, Parent_Id, TreeLevel, Station_ID, AreaTID, StationAreaDesc) {
  this.Area_Id = Area_Id
  this.Area_Desc = Area_Desc
  this.Parent_Id = Parent_Id
  this.TreeLevel = TreeLevel
  this.Station_ID = Station_ID
  this.AreaTID = AreaTID
  this.StationAreaDesc = StationAreaDesc
}

function SpaceObj(SpaceID, SpaceTID, SpaceDesc, Area_Id, AreaSpaceDesc) {
  this.SpaceID = SpaceID
  this.SpaceTID = SpaceTID
  this.SpaceDesc = SpaceDesc
  this.Area_Id = Area_Id
  this.AreaSpaceDesc = AreaSpaceDesc
}

//FirstDevIsDrawFlag用于判断该一次设备是否在地图上已经框选过
function FirstDevObj(
  FirstDevID,
  FirstDevTID,
  FirstDevDesc,
  SpaceID,
  FirstDevDescT,
  FirstDevIsDrawFlag,
  FirstDevIDOnPT
) {
  this.FirstDevID = FirstDevID
  this.FirstDevTID = FirstDevTID
  this.FirstDevDesc = FirstDevDesc
  this.SpaceID = SpaceID
  this.FirstDevDescT = FirstDevDescT
  this.FirstDevIsDrawFlag = FirstDevIsDrawFlag
  this.FirstDevIDOnPT = FirstDevIDOnPT
}
function InspectResultObj(
  Result_ID,
  Device_Id,
  Infrared_Cap,
  Infrared_File,
  IPC_PIC_Cap,
  Sound_Cap,
  IPC_Video_Cap,
  IFR_Video_Cap,
  Date_Time,
  Inspection_Result,
  Inspection_Status,
  Is_Deal,
  Bug_Level,
  Deal_Method,
  InspectionLog_ID,
  Is_Read,
  DeviceID,
  RLeft,
  RTop,
  RRight,
  RBottom,
  CoordinateArray,
  ResultPointX,
  ResultPointY,
  CarID,
  CheckMan,
  CheckDate,
  Confirm_Result,
  IPCSPIC
) {
  this.Result_ID = Result_ID
  this.Device_Id = Device_Id
  this.Infrared_Cap = Infrared_Cap
  this.Infrared_File = Infrared_File
  this.IPC_PIC_Cap = IPC_PIC_Cap
  this.Sound_Cap = Sound_Cap
  this.IPC_Video_Cap = IPC_Video_Cap
  this.IFR_Video_Cap = IFR_Video_Cap
  this.Date_Time = Date_Time
  this.Inspection_Result = Inspection_Result
  this.Inspection_Status = Inspection_Status
  this.Is_Deal = Is_Deal
  this.Bug_Level = Bug_Level
  this.Deal_Method = Deal_Method
  this.InspectionLog_ID = InspectionLog_ID
  this.Is_Read = Is_Read

  //这条结果对应的红外设备的ID（如果不是红外设备，该ID为NULL）
  this.DeviceID = DeviceID

  this.RLeft = RLeft
  this.RTop = RTop
  this.RRight = RRight
  this.RBottom = RBottom
  this.CoordinateArray = CoordinateArray
  this.ResultPointX = ResultPointX
  this.ResultPointY = ResultPointY
  this.CarID = CarID
  this.CheckMan = CheckMan
  this.CheckDate = CheckDate
  this.Confirm_Result = Confirm_Result
  this.IPCSPIC = IPCSPIC
}

//在目前的系统设计中，没有具体某一个任务的概念，只有巡检路线以及巡检规则的概念，每一条任务是由任务规则分析得出的任务
//任务ID用Task_Rule_Id+RunTime组合在一起，必然能确定某一条任务
function TaskObj(ID, Task_Rule_Id, RunTime) {
  this.ID = ID
  this.Task_Rule_Id = Task_Rule_Id
  this.RunTime = RunTime //任务执行时间，是根据任务规则计算得来的
}

function TaskPathObj(
  Task_Path_Id,
  Task_Path_Desc,
  ConcurrentTask,
  InspectType,
  StartTime,
  BeginTime,
  EndTime,
  UnBeginTime,
  UnEndTime,
  RepeatNum,
  TaskRuleGrid,
  Priority,
  DeviceLevel,
  RuleMonth,
  RuleWeek,
  IFR_Flag
) {
  this.Task_Path_Id = Task_Path_Id
  this.Task_Path_Desc = Task_Path_Desc
  this.ConcurrentTask = ConcurrentTask
  this.InspectType = InspectType
  this.StartTime = StartTime
  this.BeginTime = BeginTime
  this.EndTime = EndTime
  this.UnBeginTime = UnBeginTime
  this.UnEndTime = UnEndTime
  this.RepeatNum = RepeatNum
  this.TaskRuleGrid = TaskRuleGrid
  this.Priority = Priority
  this.DeviceLevel = DeviceLevel
  this.RuleMonth = RuleMonth
  this.RuleWeek = RuleWeek
  this.IFR_Flag = IFR_Flag
}

//变电站
function StationObj(
  Station_ID,
  Station_Name,
  Station_Note,
  StationIDOnPT,
  StationCode,
  SectionID,
  VolLevel,
  StationType
) {
  this.Station_ID = Station_ID
  this.Station_Name = Station_Name
  this.Station_Note = Station_Note
  this.StationIDOnPT = StationIDOnPT
  this.StationCode = StationCode
  this.SectionID = SectionID
  this.VolLevel = VolLevel
  this.StationType = StationType
}

//区域
function SectionObj(SectionID, SectionName, SectionNote, SectionCode) {
  this.SectionID = SectionID
  this.SectionName = SectionName
  this.SectionNote = SectionNote
  this.SectionCode = SectionCode
}

function CameraObj(
  CameraID,
  CameraName,
  CameraType,
  CarID,
  IFRCameraIP,
  IFRCameraHttpPort,
  IFRCameraRtspPort,
  IFRCameraComPort,
  IFRCameraUser,
  IFRCameraPass,
  IPCCameraIP,
  IPCCameraHttpPort,
  IPCCameraRtspPort,
  IPCCameraComPort,
  IPCCameraUser,
  IPCCameraPass,
  IFRVideoFrom,
  DVRIP,
  DVRHttpPort,
  DVRRtspPort,
  DVRComPort,
  DVRRemoteIP,
  DVRRemoteHttpPort,
  DVRRemoteRtspPort,
  DVRRemoteComPort,
  DVRUser,
  DVRPass,
  DVRChannel,
  DevXPosInMap,
  DevYPosInMap,
  CameraIDRobot,
  IFRCameraType,
  VideoIPCCameraIP,
  VideoIFRCameraIP,
  VideoIFRCameraHttpPort,
  VideoIPCCameraComPort,
  VideoIFRCameraComPort,
  VideoIPCCameraRtspPort,
  VideoIFRCameraRtspPort,
  VideoIPCCameraHttpPort,
  VideoDVRIP,
  VideoDVRHttpPort,
  VideoDVRRtspPort,
  VideoDVRComPort,
  IFRCameraRemoteHttpPort,
  IFRCameraRemoteRtspPort,
  IFRCameraRemoteComPort,
  IPCCameraRemoteHttpPort,
  IPCCameraRemoteRtspPort,
  IPCCameraRemoteComPort,
  IPCVideoFrom,
  IPCDVRIP,
  IPCDVRHttpPort,
  IPCDVRRtspPort,
  IPCDVRComPort,
  IPCDVRRemoteIP,
  IPCDVRRemoteHttpPort,
  IPCDVRRemoteRtspPort,
  IPCDVRRemoteComPort,
  IPCDVRUser,
  IPCDVRPass,
  IPCDVRChannel,
  VideoIPCDVRIP,
  VideoIPCDVRHttpPort,
  VideoIPCDVRRtspPort,
  VideoIPCDVRComPort,
  MapID,
  IPCCameraType,
  IFRDVRID,
  IPCDVRID,
  FullViewChannel,
  AutoOpenVideo,
  IPCDVRType,
  AppKey,
  Secret,
  MonitorCode,
  MonitorCode2,
  MonitorCode3,
  MonitorCodeIFR,
  IFRStoreFrom,
  IPCStoreFrom,
  PTZType,
  Manufacture,
  FullCameraID,
  XPosInFullView,
  YPosInFullView,
  IsRobotCamera,
  DeviceSource,
  ProductionCode,
  ProductionDate,
  PhyassetID,
  RecordPeriod,
  IFRRecordPeriod,
  AcessProtocol,
  BProtocol,
  PatroldeviceCode,
  DVRType,
  SubIPCDVRType
) {
  this.CameraID = CameraID
  this.CameraName = CameraName

  this.CameraType = CameraType
  this.CarID = CarID

  this.IFRCameraIP = IFRCameraIP
  this.IFRCameraHttpPort = IFRCameraHttpPort
  this.IFRCameraRtspPort = IFRCameraRtspPort
  this.IFRCameraComPort = IFRCameraComPort
  this.IFRCameraUser = IFRCameraUser
  this.IFRCameraPass = IFRCameraPass
  this.IPCCameraIP = IPCCameraIP
  this.IPCCameraHttpPort = IPCCameraHttpPort
  this.IPCCameraRtspPort = IPCCameraRtspPort
  this.IPCCameraComPort = IPCCameraComPort
  this.IPCCameraUser = IPCCameraUser
  this.IPCCameraPass = IPCCameraPass
  this.DevXPosInMap = DevXPosInMap
  this.DevYPosInMap = DevYPosInMap

  this.IFRVideoFrom = IFRVideoFrom
  this.DVRIP = DVRIP
  this.DVRHttpPort = DVRHttpPort
  this.DVRRtspPort = DVRRtspPort
  this.DVRComPort = DVRComPort
  this.DVRRemoteIP = DVRRemoteIP
  this.DVRRemoteHttpPort = DVRRemoteHttpPort
  this.DVRRemoteRtspPort = DVRRemoteRtspPort
  this.DVRRemoteComPort = DVRRemoteComPort
  this.DVRUser = DVRUser
  this.DVRPass = DVRPass
  this.DVRChannel = DVRChannel
  this.CameraIDRobot = CameraIDRobot
  this.IFRCameraType = IFRCameraType

  this.IFRCameraRemoteHttpPort = IFRCameraRemoteHttpPort
  this.IFRCameraRemoteRtspPort = IFRCameraRemoteRtspPort
  this.IFRCameraRemoteComPort = IFRCameraRemoteComPort
  this.IPCCameraRemoteHttpPort = IPCCameraRemoteHttpPort
  this.IPCCameraRemoteRtspPort = IPCCameraRemoteRtspPort
  this.IPCCameraRemoteComPort = IPCCameraRemoteComPort

  this.IPCVideoFrom = IPCVideoFrom
  this.IPCDVRIP = IPCDVRIP
  this.IPCDVRHttpPort = IPCDVRHttpPort
  this.IPCDVRRtspPort = IPCDVRRtspPort
  this.IPCDVRComPort = IPCDVRComPort
  this.IPCDVRRemoteIP = IPCDVRRemoteIP
  this.IPCDVRRemoteHttpPort = IPCDVRRemoteHttpPort
  this.IPCDVRRemoteRtspPort = IPCDVRRemoteRtspPort
  this.IPCDVRRemoteComPort = IPCDVRRemoteComPort
  this.IPCDVRUser = IPCDVRUser
  this.IPCDVRPass = IPCDVRPass
  this.IPCDVRChannel = IPCDVRChannel

  this.VideoIPCDVRIP = VideoIPCDVRIP
  this.VideoIPCDVRHttpPort = VideoIPCDVRHttpPort
  this.VideoIPCDVRRtspPort = VideoIPCDVRRtspPort
  this.VideoIPCDVRComPort = VideoIPCDVRComPort

  this.MapID = MapID

  //有红外设备
  if (CameraType == 0 || CameraType == 2) {
    //		this.PingHttpSrc="http://"+IFRCameraIP+"/images/blank.gif";

    //DVR
    if (IFRVideoFrom == 1) {
      this.PingHttpSrc =
        'http://' + DVRIP + ':' + DVRHttpPort + '/doc/images/ptz/ptz_select/left.png'
    } else {
      this.PingHttpSrc = 'http://' + IFRCameraIP + ':' + IFRCameraHttpPort + '/images/blank.gif'

      //dm60
      if (IFRCameraType == 10) {
        this.PingHttpSrc =
          'http://' + IFRCameraIP + ':' + IFRCameraHttpPort + '/chs/images/btnUp.gif'
      }
      //dm63
      else if (IFRCameraType == 0) {
        this.PingHttpSrc = 'http://' + IFRCameraIP + ':' + IFRCameraHttpPort + '/images/fon_h.gif'
      }
    }
  } else {
    //		this.PingHttpSrc="http://"+IPCCameraIP+"/doc/ui/images/artDialog/loading.gif";
    this.PingHttpSrc =
      'http://' + IPCCameraIP + ':' + IPCCameraHttpPort + '/doc/ui/images/artDialog/loading.gif'
  }

  this.AlarmStat = 0
  this.IPCOffline = 0
  this.IFROffline = 0
  this.Run = 0

  this.VideoIPCCameraIP = VideoIPCCameraIP
  this.VideoIFRCameraIP = VideoIFRCameraIP
  this.VideoIFRCameraHttpPort = VideoIFRCameraHttpPort
  this.VideoIPCCameraComPort = VideoIPCCameraComPort
  this.VideoIFRCameraComPort = VideoIFRCameraComPort
  this.VideoIPCCameraRtspPort = VideoIPCCameraRtspPort
  this.VideoIFRCameraRtspPort = VideoIFRCameraRtspPort
  this.VideoIPCCameraHttpPort = VideoIPCCameraHttpPort

  this.VideoDVRIP = VideoDVRIP
  this.VideoDVRHttpPort = VideoDVRHttpPort
  this.VideoDVRRtspPort = VideoDVRRtspPort
  this.VideoDVRComPort = VideoDVRComPort

  this.IPCCameraType = IPCCameraType
  this.IFRDVRID = IFRDVRID
  this.IPCDVRID = IPCDVRID
  this.FullViewChannel = FullViewChannel
  this.AutoOpenVideo = AutoOpenVideo
  this.IPCDVRType = IPCDVRType
  this.AppKey = AppKey
  this.Secret = Secret
  this.MonitorCode = MonitorCode
  this.MonitorCode2 = MonitorCode2
  this.MonitorCode3 = MonitorCode3
  this.MonitorCodeIFR = MonitorCodeIFR
  this.IFRStoreFrom = IFRStoreFrom
  this.IPCStoreFrom = IPCStoreFrom
  this.PTZType = PTZType
  this.Manufacture = Manufacture
  this.FullCameraID = FullCameraID
  this.XPosInFullView = XPosInFullView
  this.YPosInFullView = YPosInFullView
  this.IsRobotCamera = IsRobotCamera
  this.DeviceSource = DeviceSource
  this.ProductionCode = ProductionCode
  this.ProductionDate = ProductionDate
  this.PhyassetID = PhyassetID
  this.RecordPeriod = RecordPeriod
  this.IFRRecordPeriod = IFRRecordPeriod
  this.AcessProtocol = AcessProtocol
  this.BProtocol = BProtocol
  this.PatroldeviceCode = PatroldeviceCode
  this.DVRType = DVRType
  this.SubIPCDVRType = SubIPCDVRType
}

function CarObj(
  CarID,
  CarType,
  CarName,
  CarIP,
  CarPort,
  CarUser,
  CarPass,
  Station_ID,
  Station_Name,
  FTPServer,
  FTPServerPort,
  FTPUser,
  FTPPass,
  CarXPosInMap,
  CarYPosInMap,
  CarGUID,
  CarIDOnPT,
  Offline,
  DisRelateVideo,
  CarHref,
  DisplayWeatherData,
  CommunicateProtocol,
  Manufacture,
  CarVersion,
  UseUnit,
  DeviceSource,
  ProductionDate,
  ProductionCode,
  PatroldeviceInfo,
  PhyassetID,
  Appid,
  AppKey,
  Topic,
  GatewayID,
  GatewayTopic,
  DeviceTopic
) {
  this.CarID = CarID
  this.CarType = CarType
  this.CarName = CarName
  this.CarIP = CarIP
  this.CarPort = CarPort
  this.CarUser = CarUser
  this.CarPass = CarPass
  this.Station_ID = Station_ID
  this.Station_Name = Station_Name
  this.FTPServer = FTPServer
  this.FTPServerPort = FTPServerPort
  this.FTPUser = FTPUser
  this.FTPPass = FTPPass
  this.CarXPosInMap = CarXPosInMap
  this.CarYPosInMap = CarYPosInMap

  this.AlarmStat = 0
  this.Offline = Offline
  this.Run = 0
  this.CarGUID = CarGUID
  this.CarIDOnPT = CarIDOnPT
  this.DisRelateVideo = DisRelateVideo
  this.CarHref = CarHref
  this.DisplayWeatherData = DisplayWeatherData
  this.CommunicateProtocol = CommunicateProtocol
  this.Manufacture = Manufacture
  this.CarVersion = CarVersion
  this.UseUnit = UseUnit
  this.DeviceSource = DeviceSource
  this.ProductionDate = ProductionDate
  this.ProductionCode = ProductionCode
  this.PatroldeviceInfo = PatroldeviceInfo
  this.PhyassetID = PhyassetID
  this.Appid = Appid
  this.AppKey = AppKey
  this.Topic = Topic
  this.GatewayID = GatewayID
  this.GatewayTopic = GatewayTopic
  this.DeviceTopic = DeviceTopic
}

function MapObj(MapId, MapName, NaviMapData, Station_ID, MapFlag, MapWidth, MapHeight) {
  this.MapId = MapId
  this.MapName = MapName
  this.NaviMapData = NaviMapData

  this.Station_ID = Station_ID
  this.MapFlag = MapFlag
  this.MapWidth = MapWidth
  this.MapHeight = MapHeight
}

function FirstDevMapObj(
  FirstDevMapId,
  FirstDevMapWidth,
  FirstDevMapHeight,
  Station_ID,
  FirstDevMapName
) {
  this.FirstDevMapId = FirstDevMapId
  this.FirstDevMapWidth = FirstDevMapWidth
  this.FirstDevMapHeight = FirstDevMapHeight

  this.Station_ID = Station_ID
  this.FirstDevMapName = FirstDevMapName
}

function UserObj(
  User_Id,
  User_Name,
  User_Pwd,
  User_Level,
  MenuInfo,
  CarInfo,
  PwdValidity,
  PwdCreateTime,
  AuditTime,
  BeginTime,
  EndTime,
  AuditClass,
  DogId,
  Disable,
  Depart,
  DevID
) {
  this.User_Id = User_Id
  this.User_Name = User_Name
  this.User_Pwd = User_Pwd
  this.User_Level = User_Level
  this.MenuInfo = MenuInfo
  this.CarInfo = CarInfo
  this.PwdValidity = PwdValidity
  this.PwdCreateTime = PwdCreateTime
  this.AuditTime = AuditTime
  this.BeginTime = BeginTime
  this.EndTime = EndTime
  this.AuditClass = AuditClass
  this.DogId = DogId
  this.Disable = Disable
  this.Depart = Depart
  this.DevID = DevID
}
//vwinfo数组用于记录每个视频窗口的信息
/*
CameraID:打开监视的设备CameraID
*/
function VWObj() {
  this.DevID = ''
  this.st = 0 ///streamType=0主码流，streamType=1子码流
  this.MonitorType = '' //0表示打开红外，1表示打开可见光，2表示打开DM10的融合图像,3表示DM10的可见光
  this.CameraID = ''
  this.ReContectF = 0 //是否处于重连状态，1表示正处于重连状态
  this.bUseing = 0 //0表示空闲，1表示正在使用，包括正处于打开监视的状态（还没有收到打开成功消息之前）也认为是使用状态
  this.playurl = ''
  this.vlc = $_('o' + i)
  this.CGITopAddress = ''
  this.isLogin = 0 //0代表未登陆，1代表登陆
}

function vlcObj(i, playurl) {
  this.vlcID = i
  this.playurl = playurl
  this.monitorTimer = ''
  this.vlc = $_('o' + i)
  this.prevState = ''
}

function InspectionObj(ID, insp_priority, Inspection_Type, MapId) {
  this.ID = ID
  this.insp_priority = insp_priority
  this.Inspection_Type = Inspection_Type
  this.MapId = MapId
}

function GoodNessObj(ID, PosX, PosY, Value) {
  this.ID = ID
  this.PosX = PosX
  this.PosY = PosY
  this.Value = Value
}

function PresetObj(
  Preset_Id,
  Preset_Desc,
  Inspection_Id,
  PTZ_H,
  PTZ_V,
  IPC_F,
  IPC_Z,
  IPC_F_B,
  IPC_Z_B,
  IFR_F,
  Preset_Flag,
  FirstDevID
) {
  this.Preset_Id = Preset_Id
  this.Preset_Desc = Preset_Desc
  this.Inspection_Id = Inspection_Id
  this.PTZ_H = PTZ_H
  this.PTZ_V = PTZ_V
  this.IPC_F = IPC_F
  this.IPC_Z = IPC_Z
  this.IPC_F_B = IPC_F_B
  this.IPC_Z_B = IPC_Z_B
  this.IFR_F = IFR_F
  this.Preset_Flag = Preset_Flag
  this.FirstDevID = FirstDevID
}

function RelateDeviceObj(
  Relevance_ID,
  Self_Device_Id,
  Relevance_Device_Id,
  Device_Desc,
  CarName,
  CameraName,
  InspectFlag
) {
  this.Relevance_ID = Relevance_ID
  this.Self_Device_Id = Self_Device_Id
  this.Relevance_Device_Id = Relevance_Device_Id
  this.Device_Desc = Device_Desc
  this.CarName = CarName
  this.CameraName = CameraName
  this.InspectFlag = InspectFlag
}

//vwinfo数组用于记录每个视频窗口的信息
/*
DevID:打开监视的设备ID
该ID是由 CameraID+"_0"  _1 _2 组成的。
_0代表红外图像
_1代表可见光图像
_2表示打开DM10的融合图像
_3表示DM10的可见光


st:记录每个视频窗口的主子码流情况，0主1子(array)
at://记录每个视频窗口音频开启情况，0关1开(array)
ss://记录每个视频窗口是否是只发帧头，0为发帧头，1为正常发送(array)
cs://各视频巡航状态 -1: 没有巡航 10: 自动巡航 0-7: 巡航路线(array)
ez:当前是否处于电子放大状态,ez=0为正常状态，ez=1为电子放大状态
lt:记录该通道云台灯光控制状态。0灯灭，1灯亮
br:记录该通道云台雨刷控制状态。0雨刷停，1雨刷动
mh:监视句柄
lh:登录句柄
*/
function realplayobj() {
  this.DevID = ''
  this.st = 0 ///streamType=0主码流，streamType=1子码流
  this.at = 0 //默认没有打开音频
  this.ss = 1 //默认为正常发送
  this.cs = -1
  this.ez = 0
  this.lt = 0
  this.br = 0
  this.mh = -1
  this.lh = -1
  this.ReContectF = 0 //是否处于重连状态，1表示正处于重连状态
  this.eZoomFlag = 0 //该通道是否处于电子放大状态，1处于电子放大状态，0处于正常状态
  this.bUseing = 0 //0表示空闲，1表示正在使用，包括正处于打开监视的状态（还没有收到打开成功消息之前）也认为是使用状态

  this.ID = -1 //在按文件回放时，记录该文件在文件对象中的ID，按时间回放时，该ID为-1
  this.Stat = 0 //1表示正在回放，0表示关闭状态

  this.StartTime = '' //该播放器当前播放内容的起始时间,字符串型
  this.EndTime = '' //该播放器当前播放内容的结束时间,字符串型
  this.Pos = 0 //当前播放视频的百分比
  this.QuickPlayStat = 0 //快放按钮点击的情况
  this.SlowPlayStat = 0 //慢放按钮点击的情况
  this.PauseStat = 0 //当前窗口的是否处于暂停状态
  this.STServerID = '' //回放存储服务器时，记录该文件所在存储服务器的ID
  //this.ReContectF=0;//是否处于重连状态，1表示正处于重连状态
  //this.eZoomFlag=0;//该通道是否处于电子放大状态，1处于电子放大状态，0处于正常状态
  this.AudioStat = 0 //默认音频没有打开

  this.playurl = '' //vlc播放时，该窗口的 rtsp路径

  //vlc播放时
  this.MainStreamUrl = '' //主码流地址
  this.SubStreamUrl = '' //子码流地址

  this.vlcID = i
  this.monitorTimer = ''
  this.vlc = '' //播放器控件。$_("o"+i)
  this.prevState = ''
  this.CameraID = '' //当前播放器播放的CameraID
  this.MonitorType = '' //0表示打开红外，1表示打开可见光，2表示打开DM10的融合图像,3表示DM10的可见光

  this.IFRCameraUser = ''
  this.IFRCameraPass = ''
  this.CGITopAddress = ''
  this.IFRCameraIP = ''
  this.jpg_url = ''

  this.isLogin = 0 //0代表未登陆，1代表登陆
  this.IFRUserType = '' //通过CGI登陆红外摄像机后，摄像机返回的UserType
  this.IFRVersion = '' //通过CGI登陆红外摄像机后，摄像机返回的version
  this.FullCameraID = '' //全景摄像机新增
  this.PlayFileName = '' //回放文件时的文件名
  this.DVRIP = ''
  this.DVRComPort = ''
  this.DVRUser = ''
  this.DVRPassword = ''
  this.DVRChannel = ''
}

function CamerasForDeviceObj(
  Id,
  Device_Id,
  CameraID,
  IFRCameraIP,
  IFRCameraHttpPort,
  IFRCameraRtspPort,
  IFRCameraComPort,
  IFRCameraUser,
  IFRCameraPass,
  IFRCameraType,
  IPCCameraIP,
  IPCCameraHttpPort,
  IPCCameraRtspPort,
  IPCCameraComPort,
  IPCCameraUser,
  IPCCameraPass,
  IPCCameraType,
  CameraType,
  IFRVideoFrom,
  DVRIP,
  DVRHttpPort,
  DVRRtspPort,
  DVRComPort,
  DVRUser,
  DVRPass,
  DVRChannel,
  CarID
) {
  this.Id = Id
  this.Device_Id = Device_Id
  this.CameraID = CameraID
  this.IFRCameraIP = IFRCameraIP
  this.IFRCameraHttpPort = IFRCameraHttpPort
  this.IFRCameraRtspPort = IFRCameraRtspPort
  this.IFRCameraComPort = IFRCameraComPort
  this.IFRCameraUser = IFRCameraUser
  this.IFRCameraPass = IFRCameraPass
  this.IFRCameraType = IFRCameraType
  this.IPCCameraIP = IPCCameraIP
  this.IPCCameraHttpPort = IPCCameraHttpPort
  this.IPCCameraRtspPort = IPCCameraRtspPort
  this.IPCCameraComPort = IPCCameraComPort
  this.IPCCameraUser = IPCCameraUser
  this.IPCCameraPass = IPCCameraPass
  this.IPCCameraType = IPCCameraType
  this.CameraType = CameraType

  this.IFRVideoFrom = IFRVideoFrom
  this.DVRIP = DVRIP
  this.DVRHttpPort = DVRHttpPort
  this.DVRRtspPort = DVRRtspPort
  this.DVRComPort = DVRComPort
  this.DVRUser = DVRUser
  this.DVRPass = DVRPass
  this.DVRChannel = DVRChannel
  this.CarID = CarID
}

function allFajiDeviceObj(FajiID, DeviceDesc, FajiDeviceID) {
  this.FajiID = FajiID
  this.DeviceDesc = DeviceDesc
  this.FajiDeviceID = FajiDeviceID
}

function FajiInspectResultObj(
  Result_ID,
  Device_Id,
  Date_Time,
  Inspection_Result,
  StationTemp,
  fajiID,
  fajiDeviceDesc,
  Device_Desc,
  FirstDevDesc,
  SpaceDesc,
  Area_Desc,
  AreaDevType,
  SideFlag
) {
  this.Result_ID = Result_ID
  this.Device_Id = Device_Id
  this.Date_Time = Date_Time
  this.Inspection_Result = Inspection_Result
  this.StationTemp = StationTemp
  this.fajiID = fajiID
  this.fajiDeviceDesc = fajiDeviceDesc
  this.Device_Desc = Device_Desc
  this.FirstDevDesc = FirstDevDesc
  this.SpaceDesc = SpaceDesc
  this.Area_Desc = Area_Desc
  this.AreaDevType = AreaDevType
  this.SideFlag = SideFlag
}

function VideoGroupObj(GroupID, GroupName, CameraID, User_Id) {
  this.GroupID = GroupID
  this.GroupName = GroupName
  this.CameraID = CameraID
  this.User_Id = User_Id
}

function FaceGroupObj(GroupID, GroupName, CameraID, User_Id) {
  this.FaceGroupID = GroupID
  this.FaceGroupName = GroupName
  this.AlarmEnable = CameraID
  this.Station_ID = User_Id
}

function lxDevobj() {
  this.DevID = ''
  this.DevName = ''
  this.CameraID = '' //当前播放器播放的CameraID
}

function LXObj(PageID, DevIDs, WaitTime) {
  this.PageID = PageID
  this.DevIDs = DevIDs
  this.WaitTime = WaitTime
}

function DVRObj(
  DVRID,
  DVRIP,
  OnlineStatue,
  CarID,
  RecordStatue,
  TotalCapacity,
  UsedCapacity,
  DVRDesc,
  DVRPort,
  DVRHttpPort,
  DVRRtspPort,
  DVRComPort,
  DVRRemoteIP,
  DVRRemoteHttpPort,
  DVRRemoteRtspPort,
  DVRRemoteComPort,
  DVRUser,
  DVRPassword
) {
  this.DVRID = DVRID
  this.DVRIP = DVRIP
  this.OnlineStatue = OnlineStatue
  this.CarID = CarID
  this.RecordStatue = RecordStatue
  this.TotalCapacity = TotalCapacity
  this.UsedCapacity = UsedCapacity
  this.DVRDesc = DVRDesc
  this.DVRPort = DVRPort
  this.DVRHttpPort = DVRHttpPort
  this.DVRRtspPort = DVRRtspPort
  this.DVRComPort = DVRComPort
  this.DVRRemoteIP = DVRRemoteIP
  this.DVRRemoteHttpPort = DVRRemoteHttpPort
  this.DVRRemoteRtspPort = DVRRemoteRtspPort
  this.DVRRemoteComPort = DVRRemoteComPort
  this.DVRUser = DVRUser
  this.DVRPassword = DVRPassword
}

function netSecurityObj(NetId, AllowedIP, AllowedMAC) {
  this.NetId = NetId
  this.AllowedIP = AllowedIP
  this.AllowedMAC = AllowedMAC
}

function netDevInfoObj(
  NetDevID,
  NetDevName,
  NeDevIP,
  NeDevPort,
  UserName,
  UserPwd,
  ChannelNumber,
  AlarmInNum,
  AlarmOutNum,
  OnlineSatus,
  AreaID,
  XPosInMap,
  YPosInMap,
  DVRSubType
) {
  this.NetDevID = NetDevID
  this.NetDevName = NetDevName
  this.NeDevIP = NeDevIP
  this.NeDevPort = NeDevPort
  this.UserName = UserName
  this.UserPwd = UserPwd
  this.ChannelNumber = ChannelNumber
  this.AlarmInNum = AlarmInNum
  this.AlarmOutNum = AlarmOutNum
  this.OnlineSatus = OnlineSatus
  this.AreaID = AreaID
  this.XPosInMap = XPosInMap
  this.YPosInMap = YPosInMap
  this.DVRSubType = DVRSubType
}

function extDevInfoObj(
  EXTDevID,
  NetDevID,
  DevType,
  DevName,
  Device_Stat,
  extDevDetialType,
  DeviceNONC,
  DevSubType,
  DevPort,
  DevXPosInMap,
  DevYPosInMap,
  RealTimeResult,
  ThresholdMaxValue,
  ThresholdMinValue,
  EnableType,
  DevAddress
) {
  this.EXTDevID = EXTDevID
  this.NetDevID = NetDevID
  this.DevType = DevType
  this.DevName = DevName
  this.Device_Stat = Device_Stat
  this.extDevDetialType = extDevDetialType
  this.DeviceNONC = DeviceNONC
  this.DevSubType = DevSubType
  this.DevPort = DevPort
  this.DevXPosInMap = DevXPosInMap
  this.DevYPosInMap = DevYPosInMap
  this.RealTimeResult = RealTimeResult
  this.ThresholdMaxValue = ThresholdMaxValue
  this.ThresholdMinValue = ThresholdMinValue
  this.EnableType = EnableType
  this.DevAddress = DevAddress
}

function faceInfoObj(
  FaceId,
  Name,
  FileDir,
  CarID,
  IDOnRobot,
  FaceGroupID,
  FileDir2,
  FileDir3,
  FileDir4,
  FileDir5,
  Famale,
  Certificate,
  BirthDate,
  CertificateNo,
  Province,
  City,
  Hint,
  Duty,
  AlarmEnable,
  Station_ID
) {
  this.FaceId = FaceId
  this.Name = Name
  this.FileDir = FileDir
  this.CarID = CarID
  this.IDOnRobot = IDOnRobot
  this.FaceGroupID = FaceGroupID

  this.FileDir2 = FileDir2
  this.FileDir3 = FileDir3
  this.FileDir4 = FileDir4
  this.FileDir5 = FileDir5
  this.Famale = Famale
  this.Certificate = Certificate
  this.BirthDate = BirthDate
  this.CertificateNo = CertificateNo
  this.Province = Province
  this.City = City
  this.Hint = Hint
  this.Duty = Duty
  this.AlarmEnable = AlarmEnable
  this.Station_ID = Station_ID
}

function allCameraPosObj(CameraID, FullCameraID, XPosInFullView, YPosInFullView) {
  this.CameraID = CameraID
  this.FullCameraID = FullCameraID
  this.XPosInFullView = XPosInFullView
  this.YPosInFullView = YPosInFullView
}

function DepartmentObj(DepartmentId, DepartmentName) {
  this.DepartmentId = DepartmentId
  this.DepartmentName = DepartmentName
}

function PageIfrObj(PageIfrID, PageIfrName, PageIfrUrl) {
  this.PageIfrID = PageIfrID
  this.PageIfrName = PageIfrName
  this.PageIfrUrl = PageIfrUrl
}

function DeviceGroupObj(DevGroupid, DevGroupName, AlarmValue) {
  this.DevGroupid = DevGroupid
  this.DevGroupName = DevGroupName
  this.AlarmValue = AlarmValue
}

function nvrRecObj(Result_ID, NVRID, ChannelID, StartTime, EndTime, FileName) {
  this.Result_ID = Result_ID
  this.NVRID = NVRID
  this.ChannelID = ChannelID
  this.StartTime = StartTime
  this.EndTime = EndTime
  this.FileName = FileName
}
function AreaHintObj(AreaHintCode, AreaHintName, AreaHintStart, AreaHintEnd, AreaHintFlag) {
  this.AreaHintCode = AreaHintCode
  this.AreaHintName = AreaHintName
  this.AreaHintStart = AreaHintStart
  this.AreaHintEnd = AreaHintEnd
  this.AreaHintFlag = AreaHintFlag
}
function SectionObj(SectionID, SectionName, SectionNode, SectionCode, ParentID, TreeLevel) {
  this.SectionID = SectionID
  this.SectionName = SectionName
  this.SectionNode = SectionNode
  this.SectionCode = SectionCode
  this.ParentID = ParentID
  this.TreeLevel = TreeLevel
}

function allFaceGroupObj(FaceGroupID, FaceGroupName, AlarmEnable, Station_ID) {
  this.FaceGroupID = FaceGroupID
  this.FaceGroupName = FaceGroupName
  this.AlarmEnable = AlarmEnable
  this.Station_ID = Station_ID
}
function extDevResultObj(
  ResultId,
  RecTime,
  DataValue,
  NetDevName,
  DevName,
  Device_Detial_Type,
  ResultUnit,
  EXTDevID,
  DeviceLowTemp,
  DeviceTemp,
  Result_Status,
  CO2Value,
  CL2Value,
  HCLValue,
  VOCValue,
  PM25Value,
  PM10Value,
  EXValue,
  EYValue,
  EZValue,
  ECValue,
  HXValue,
  HYValue,
  HZValue,
  HCValue,
  air_Temp,
  relative_humidity,
  PowerValue,
  DeviceType,
  SF6_Value,
  O2Value
) {
  this.ResultId = ResultId
  this.RecTime = RecTime
  this.DataValue = DataValue
  this.NetDevName = NetDevName
  this.DevName = DevName
  this.Device_Detial_Type = Device_Detial_Type
  this.ResultUnit = ResultUnit
  this.EXTDevID = EXTDevID
  this.DeviceLowTemp = DeviceLowTemp
  this.DeviceTemp = DeviceTemp
  this.Result_Status = Result_Status
  this.CO2Value = CO2Value
  this.CL2Value = CL2Value
  this.HCLValue = HCLValue
  this.VOCValue = VOCValue
  this.PM25Value = PM25Value
  this.PM10Value = PM10Value
  this.EXValue = EXValue
  this.EYValue = EYValue
  this.EZValue = EZValue
  this.ECValue = ECValue
  this.HXValue = HXValue
  this.HYValue = HYValue
  this.HZValue = HZValue
  this.HCValue = HCValue
  this.air_Temp = air_Temp
  this.relative_humidity = relative_humidity
  this.PowerValue = PowerValue
  this.DeviceType = DeviceType
  this.SF6_Value = SF6_Value
  this.O2Value = O2Value
}

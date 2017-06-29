package cn.fenix.ry.serviceImple;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.controller.converter.CustomDateConverter;
import cn.fenix.ry.dao.ScheduleDao;
import cn.fenix.ry.entity.Schedule;
import cn.fenix.ry.service.ScheduleService;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {
	@Resource
	ScheduleDao scheduleDao;
	@Override
	/**
	 * 根据订单号和产品名称查出进度表
	 */
	public List<Map<String,Object>> listSchedule(String orderNo,String productName) throws Exception {
		if(orderNo==null&&productName==null){
			throw new NotParamterException("请输入订单号和产品名称");
		}
		if(orderNo==null){
			throw new NotParamterException("请输入订单号");
		}
		if(productName==null){
			throw new NotParamterException("请输入产品名称");
		}
		return scheduleDao.findScheduleByParames(orderNo,productName);
	}

}

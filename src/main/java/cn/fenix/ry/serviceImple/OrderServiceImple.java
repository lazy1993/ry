package cn.fenix.ry.serviceImple;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.fenix.ry.dao.OrderDao;
import cn.fenix.ry.entity.OrderInformation;
import cn.fenix.ry.service.OrderService;
import cn.fenix.ry.util.CustomResult;
/**
 * 订单业务层
 * @author Administrator
 *
 */
@Service("orderService")
public class OrderServiceImple implements OrderService {
	/**
	 * 查询所有订单
	 */
	@Resource
	private OrderDao orderDao;
	public List<Map<String, Object>> listOrderInformation()throws Exception{
		
		return orderDao.findAllOrder();
	}
	
	/**
	 * 根据编码查询订单
	 */
	@Override
	public List<Map<String, Object>> getOrdersByCoding(String materialCoding) throws Exception {
		
		return orderDao.selectOrderByMaterialCoding(materialCoding);
	}
	
	/**
	 * 根据产品名称查询订单
	 */
	@Override
	public List<Map<String, Object>> getOrdersByName(String productName) throws Exception {
		
		return orderDao.selectOrderByName(productName);
	}
	
	/**
	 * 多条件查询订单
	 */
	@Override
	public List<Map<String, Object>> getOrdersByParams(Map<String, Object> params) throws Exception {
		
		return orderDao.selectOrderByParams(params);
	}
	
	/**
	 * 增加订单(插入)
	 */
	@Override
	public CustomResult insert(OrderInformation cOrder) throws Exception {
		String id=UUID.randomUUID().toString();
		cOrder.setId(id);
		int i = orderDao.addOrder(cOrder);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(100, "新增订单失败");
		}
	}

	/*
	 * 部分修改订单
	 */
	@Override
	public CustomResult updateOrder(OrderInformation order) throws NotOrderInformationFound {
		if(order==null){
			throw new NotOrderInformationFound("order不存在");
		}
		int i=orderDao.updateByPrimaryKey(order);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(100,"修改订单失败");
		}
	}

	@Override
	public CustomResult updateOrderAll(OrderInformation cOrder) throws NotOrderInformationFound {
		if(cOrder==null){
			throw new NotOrderInformationFound("order不存在");
		}
		int i=orderDao.updateByPrimaryKey(cOrder);
		if(i>0){
			return CustomResult.ok();
		}else{
			return CustomResult.build(101,"修改订单失败");
		}
	}
	
	/**
	 * 批量删除订单
	 */
	@Override
	public CustomResult deleteBatchs(String[] ids) throws Exception {
		if(ids==null){
			throw new NotOrderInformationFound("ids不存在");
		}
		System.out.println(ids);
		int i = orderDao.deleteBatchs(ids);
		if(i>0){
			return CustomResult.ok();
		}else{
			return null;
		}
	}

    @Override
    public List<Map<String,Object>> selectOrderNoProductName() {
        return orderDao.selectOrderNoProductName();
    }


}
